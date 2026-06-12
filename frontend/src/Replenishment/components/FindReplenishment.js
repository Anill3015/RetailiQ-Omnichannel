import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindReplenishment() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/replenishment/fetchAll", {
            headers: { "Authorization": `Bearer ${token}` }
        })
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
        <div className="container mt-4">
            <h2 className="mb-3">All Replenishment Orders</h2>

            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && orders.length === 0 && !error && (
                <div className="alert alert-info">No replenishment orders found.</div>
            )}

            {orders.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
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
                                    <td>{o.replenishmentId}</td>
                                    <td>{o.product?.sku}</td>
                                    <td>{o.fromLocation?.locationId}</td>
                                    <td>{o.toLocation?.locationId}</td>
                                    <td>{o.quantity}</td>
                                    <td>{o.status}</td>
                                    <td>
                                        <Link
                                            to={`/Replenishment/updateReplenishment/${o.replenishmentId}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/Replenishment/deleteReplenishment/${o.replenishmentId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}