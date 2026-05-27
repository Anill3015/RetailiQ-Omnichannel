import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindCustomerProfile() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/customer/fetchAll",{headers: { "Authorization": `Bearer ${token}` }})
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Customer Profiles</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
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
                                    <Link
                                        to={`/CustomerProfile/deleteCustomerProfile/${c.customerId}`}
                                        className="btn btn-danger btn-sm me-2"
                                    >
                                        Delete
                                    </Link>
                                    <Link
                                        to={`/CustomerProfile/updateCustomerProfile/${c.customerId}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}