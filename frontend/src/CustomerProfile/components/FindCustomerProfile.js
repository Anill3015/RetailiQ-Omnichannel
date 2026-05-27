import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindCustomerProfile() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9011/api/customer/fetchAll")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });
    }, []);

    return (
        <div>
            <h2>All Customer Profiles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Loyalty Tier</th>
                        <th>Preferences</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c.customerId}>
                            <td>{c.customerId}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.loyaltyTier}</td>
                            <td>{c.preferences}</td>
                            <td>
                                {/* ✅ Use absolute paths starting with / */}
                                <Link to={`/CustomerProfile/deleteCustomerProfile/${c.customerId}`}>Delete</Link>
                                {" | "}
                                <Link to={`/CustomerProfile/updateCustomerProfile/${c.customerId}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}