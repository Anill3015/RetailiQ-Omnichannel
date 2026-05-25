import axios from 'axios';
import { useState } from 'react';

export default function FindReplenishmentById() {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        if (!orderId) {
            alert("Please enter an Order ID");
            return;
        }

        axios.get(`http://localhost:9011/api/replenishment/find/${orderId}`)
            .then((response) => {
                setOrder(response.data);
                setError("");
            })
            .catch(() => {
                setOrder(null);
                setError("Order not found with ID: " + orderId);
            });
    };

    return (
        <div>
            <h2>Find Replenishment Order By ID</h2>

            <label>Order ID</label>
            <input
                type="number"
                placeholder="Enter Order ID"
                onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {order && (
                <table border="1">
                    <tbody>
                        <tr><th>Order ID</th><td>{order.orderId}</td></tr>
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