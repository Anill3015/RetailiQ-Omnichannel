import axios from "axios";
import { useState } from "react";

export default function FindCustomerProfileById() {

    const [id, setId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            setError("Please enter a Customer ID ❌");
            return;
        }

        const numericId = parseInt(id);

        // ✅ Validate ID
        if (isNaN(numericId)) {
            setError("Invalid ID ❌");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/customer/find/${numericId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {

            // ✅ Handle null response (if backend returns null)
            if (!response.data) {
                setCustomer(null);
                setError("Record not found ❌");
                return;
            }

            setCustomer(response.data);
            setError("");
        })
        .catch((err) => {
            console.error(err);
            setCustomer(null);

            if (err.response) {
                if (err.response.status === 400) {
                    setError("Invalid request ❌ Please enter valid ID");
                }
                else if (err.response.status === 404) {
                    setError("Record not found ❌");
                }
                else if (typeof err.response.data === "string") {
                    setError(err.response.data);
                }
                else {
                    setError("Something went wrong ❌");
                }
            } else {
                setError("Server not reachable ❌");
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
                    onChange={(e) => setId(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {/* ✅ Error Message */}
            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}

            {/* ✅ Customer Data */}
            {customer && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>Customer ID</th>
                            <td>{customer.customerId}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{customer.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <th>Loyalty Tier</th>
                            <td>{customer.loyaltyTier}</td>
                        </tr>
                        <tr>
                            <th>Preferences</th>
                            <td>{customer.preferences}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}