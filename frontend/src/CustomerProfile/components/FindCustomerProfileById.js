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
            .catch((err) => {
                setCustomer(null);
                setError("Customer not found with ID: " + id + " - " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Find Customer By ID</h2>

            <div className="input-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Customer ID"
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchHandler}>
                    SEARCH
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {customer && (
                <table className="table table-bordered table-striped mt-2">
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