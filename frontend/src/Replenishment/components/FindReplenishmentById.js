import axios from 'axios';
import { useState } from 'react';

export default function FindReplenishmentById() {
    const [replenishmentId, setReplenishmentId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const replenishmentIdHandler = (e) => setReplenishmentId(e.target.value);

    const searchHandler = () => {
        if (!replenishmentId) {
            alert("Please enter a Replenishment ID");
            return;
        }

        axios.get(`http://localhost:9011/api/replenishment/find/${replenishmentId}`)
            .then((response) => {
                setOrder(response.data);
                setError("");
            })
            .catch((error) => {
                setOrder(null);
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
            <h2>Find Replenishment Order By ID</h2>

            <div className="mb-3">
                <label className="form-label">Replenishment ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Replenishment ID"
                    value={replenishmentId}
                    onChange={replenishmentIdHandler}
                />
            </div>

            <button className="btn btn-primary" onClick={searchHandler}>Search</button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {order && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Replenishment ID</th><td>{order.replenishmentId}</td></tr>
                        <tr><th>Product SKU</th><td>{order.product?.sku}</td></tr>
                        <tr><th>From Location</th><td>{order.fromLocation?.locationId}</td></tr>
                        <tr><th>To Location</th><td>{order.toLocation?.locationId}</td></tr>
                        <tr><th>Quantity</th><td>{order.quantity}</td></tr>
                        <tr><th>Status</th><td>{order.status}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}