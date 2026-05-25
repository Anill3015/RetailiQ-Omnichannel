import axios from 'axios';
import { useState } from 'react';

export default function FindOrderById() {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        if (!orderId) {
            alert("Please enter an Order ID");
            return;
        }

        axios.get(`http://localhost:9011/orders/${orderId}`)
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
            <h2>Find Order By ID</h2>

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
                        <tr><th>Order ID</th><td>{order.orderID}</td></tr>
                        <tr><th>Customer ID</th><td>{order.customerID}</td></tr>
                        <tr><th>Channel</th><td>{order.channel}</td></tr>
                        <tr><th>Order Date</th><td>{order.orderDate}</td></tr>
                        <tr><th>Status</th><td>{order.status}</td></tr>
                        <tr><th>Total Amount</th><td>{order.totalAmount}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}