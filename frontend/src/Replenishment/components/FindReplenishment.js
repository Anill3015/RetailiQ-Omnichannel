import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router';

export default function FindReplenishment() {
    const [status, setStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [searched, setSearched] = useState(false);

    const searchHandler = () => {
        if (!status) {
            alert("Please enter a status");
            return;
        }

        axios.get(`http://localhost:9011/api/replenishment/status/${status}`)
            .then((response) => {
                setOrders(response.data);
                setSearched(true);
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Find Replenishment Orders by Status</h2>

            <label>Status</label>
            <input
                type="text"
                placeholder="e.g. CREATED"
                onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {searched && orders.length === 0 && (
                <p style={{ color: "red" }}>No orders found with status: {status}</p>
            )}

            {orders.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product SKU</th>
                            <th>From Location</th>
                            <th>To Location</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.orderId}>
                                <td>{o.orderId}</td>
                                <td>{o.product?.sku}</td>
                                <td>{o.fromLocation?.locationId}</td>
                                <td>{o.toLocation?.locationId}</td>
                                <td>{o.quantity}</td>
                                <td>{o.status}</td>
                                <td>
                                    <Link to={`/Replenishment/updateReplenishment/${o.orderId}`}>Edit</Link>
                                    {" | "}
                                    <Link to={`/Replenishment/deleteReplenishment/${o.orderId}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}