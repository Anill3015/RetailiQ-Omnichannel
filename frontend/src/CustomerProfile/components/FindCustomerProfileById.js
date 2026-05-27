import axios from 'axios';
import { useState } from 'react';

export default function FindCustomerProfileById() {
    const [id, setId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState("");

    const idHandler = (e) => setId(e.target.value);

    const searchHandler = () => {
        if (!id) {
            alert("Please enter a Customer ID");
            return;
        }

        axios.get(`http://localhost:9011/api/customer/find/${id}`)
            .then((response) => {
                setCustomer(response.data);
                setError("");
            })
            .catch((error) => {
                setCustomer(null);
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Find Customer By ID</h2>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Customer ID"
                    value={id}
                    onChange={idHandler}
                />
            </div>

            <button className="btn btn-primary" onClick={searchHandler}>Search</button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {customer && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Customer ID</th><td>{customer.customerId}</td></tr>
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