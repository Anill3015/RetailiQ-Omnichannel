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
        <div>
            <h2>Find Replenishment Order By ID</h2>

            <label>Replenishment ID</label>
            <input
                type="number"
                placeholder="Enter Replenishment ID"
                onChange={(e) => setReplenishmentId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {order && (
                <table border="1">
                    <tbody>
                        {/* ✅ correct field name */}
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