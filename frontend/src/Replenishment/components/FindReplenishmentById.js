import axios from "axios";
import { useState } from "react";

export default function FindReplenishmentById() {

    const [id, setId] = useState("");
    const [replenishment, setReplenishment] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter an ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/replenishment/find/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const data = response.data;   // similar to sample
            setReplenishment(data);
            setError("");
        })
        .catch((err) => {
            console.error(err);
            setReplenishment(null);
            setError("Record not found ❌");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Replenishment Order By ID</h2>

            <div className="mb-3">
                <label className="form-label">Enter ID</label>
                <input
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Replenishment ID"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {replenishment && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>Replenishment ID</th>
                            <td>{replenishment.replenishmentId}</td>
                        </tr>
                        <tr>
                            <th>Product SKU</th>
                            <td>{replenishment.product?.sku}</td>
                        </tr>
                        <tr>
                            <th>From Location</th>
                            <td>{replenishment.fromLocation?.locationId}</td>
                        </tr>
                        <tr>
                            <th>To Location</th>
                            <td>{replenishment.toLocation?.locationId}</td>
                        </tr>
                        <tr>
                            <th>Quantity</th>
                            <td>{replenishment.quantity}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{replenishment.status}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}