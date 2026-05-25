import axios from 'axios';
import { useState } from 'react';

export default function FindCustomerProfileById() {
    const [id, setId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        axios.get(`http://localhost:9011/api/customer/find/${id}`)
            .then((response) => {
                setCustomer(response.data);
                setError("");
            })
            .catch(() => {
                setCustomer(null);
                setError("Customer not found with ID: " + id);
            });
    };

    return (
        <div>
            <h2>Find Customer By ID</h2>

            <input
                type="number"
                placeholder="Enter Customer ID"
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {customer && (
                <table border="1">
                    <tbody>
                        <tr><th>ID</th><td>{customer.customerId}</td></tr>
                        <tr><th>Name</th><td>{customer.name}</td></tr>
                        <tr><th>Email</th><td>{customer.email}</td></tr>
                        <tr><th>Loyalty Tier</th><td>{customer.loyaltyTier}</td></tr>
                        <tr><th>Preferences</th><td>{customer.preferences}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}