import axios from 'axios';
import { useState } from 'react';

export default function FindReplenishmentById() {
    const [replenishmentId, setReplenishmentId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

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
                setError("Order not found with ID: " + replenishmentId +
                    " - " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Find Replenishment Order By ID</h2>

            <div className="input-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Replenishment ID"
                    onChange={(e) => setReplenishmentId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchHandler}>
                    SEARCH
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

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