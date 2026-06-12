import axios from "axios";
import { useState } from "react";

export default function FindNotificationById() {
    const [id, setId] = useState("");
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/fetchNotificationById/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => { setNotification(res.data); setError(""); })
        .catch(() => { setError("Notification not found."); setNotification(null); });
    };

    const handleMarkAsRead = () => {
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:9011/api/markAsRead/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setNotification(res.data))
        .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Find Notification By ID</h2>

            <div className="d-flex gap-2 mb-4">
                <input
                    type="number"
                    className="form-control w-auto"
                    placeholder="Enter Notification ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {notification && (
                <div className="card">
                    <div className="card-header table-dark text-white">
                        <strong>Notification Details</strong>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered mb-0">
                            <tbody>
                                <tr><th>Notification ID</th><td>{notification.notificationId}</td></tr>
                                <tr><th>User ID</th><td>{notification.userId}</td></tr>
                                <tr><th>Message</th><td>{notification.message}</td></tr>
                                <tr>
                                    <th>Category</th>
                                    <td><span className="badge bg-primary">{notification.category}</span></td>
                                </tr>
                                <tr>
                                    <th>Delivery Channel</th>
                                    <td>
                                        <span className={`badge ${
                                            notification.deliveryChannel === "EMAIL" ? "bg-info text-dark" :
                                            notification.deliveryChannel === "SMS" ? "bg-primary" :
                                            notification.deliveryChannel === "WEBHOOK" ? "bg-dark" :
                                            "bg-secondary"
                                        }`}>
                                            {notification.deliveryChannel}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <span className={`badge ${
                                            notification.status === "READ" ? "bg-success" :
                                            notification.status === "UNREAD" ? "bg-danger" :
                                            "bg-secondary"
                                        }`}>
                                            {notification.status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Read Flag</th>
                                    <td>
                                        <span className={`badge ${notification.readFlag ? "bg-success" : "bg-warning text-dark"}`}>
                                            {notification.readFlag ? "Yes" : "No"}
                                        </span>
                                    </td>
                                </tr>
                                <tr><th>Created Date</th><td>{notification.createdDate ? notification.createdDate.replace("T", " ") : "N/A"}</td></tr>
                                <tr>
                                    <th>Delivered</th>
                                    <td>
                                        <span className={`badge ${notification.delivered ? "bg-success" : "bg-warning text-dark"}`}>
                                            {notification.delivered ? "Yes" : "No"}
                                        </span>
                                    </td>
                                </tr>
                                <tr><th>Delivered At</th><td>{notification.deliveredAt ? notification.deliveredAt.replace("T", " ") : "N/A"}</td></tr>
                                <tr><th>Read At</th><td>{notification.readAt ? notification.readAt.replace("T", " ") : "N/A"}</td></tr>
                            </tbody>
                        </table>

                        {!notification.readFlag && (
                            <button className="btn btn-success mt-3" onClick={handleMarkAsRead}>
                                Mark as Read
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}