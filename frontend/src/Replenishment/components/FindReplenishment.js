import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindReplenishment() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:9011/api/replenishment/fetchAll")
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error: " + (error.response?.data?.message || error.message));
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>All Replenishment Orders</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && orders.length === 0 && !error && (
                <p>No replenishment orders found.</p>
            )}

            {orders.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Replenishment ID</th>
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
                            <tr key={o.replenishmentId}>
                                {/* ✅ correct field name from entity */}
                                <td>{o.replenishmentId}</td>
                                <td>{o.product?.sku}</td>
                                <td>{o.fromLocation?.locationId}</td>
                                <td>{o.toLocation?.locationId}</td>
                                <td>{o.quantity}</td>
                                <td>{o.status}</td>
                                <td>
                                    <Link to={`/Replenishment/updateReplenishment/${o.replenishmentId}`}>Edit</Link>
                                    {" | "}
                                    <Link to={`/Replenishment/deleteReplenishment/${o.replenishmentId}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}