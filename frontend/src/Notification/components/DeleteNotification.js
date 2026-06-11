import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteNotification() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/fetchNotificationById/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setNotification(res.data))
        .catch((error) => console.error("Error:", error));
    }, [id]);

    const handleDelete = () => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:9011/api/deleteNotification/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => navigate("/Notification/findAllNotification"))  // ← fixed path
        .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Delete Notification</h2>

            {notification ? (
                <div className="card border-danger">
                    <div className="card-header bg-danger text-white">
                        <strong>Confirm Deletion</strong>
                    </div>
                    <div className="card-body">
                        <p>Are you sure you want to delete this notification?</p>
                        <table className="table table-bordered mb-3">
                            <tbody>
                                <tr><th>Notification ID</th><td>{notification.notificationId}</td></tr>
                                <tr><th>User ID</th><td>{notification.userId}</td></tr>
                                <tr><th>Message</th><td>{notification.message}</td></tr>
                                <tr><th>Category</th><td>
                                    <span className={`badge ${
                                        notification.category === "ORDER" ? "bg-primary" :
                                        notification.category === "INVENTORY" ? "bg-warning text-dark" :
                                        notification.category === "PROMOTION" ? "bg-success" :
                                        notification.category === "INTEGRATION" ? "bg-info text-dark" :
                                        "bg-secondary"
                                    }`}>
                                        {notification.category}
                                    </span>
                                </td></tr>
                                <tr><th>Delivery Channel</th><td>
                                    <span className={`badge ${
                                        notification.deliveryChannel === "EMAIL" ? "bg-info text-dark" :
                                        notification.deliveryChannel === "SMS" ? "bg-primary" :
                                        notification.deliveryChannel === "WEBHOOK" ? "bg-dark" :
                                        "bg-secondary"
                                    }`}>
                                        {notification.deliveryChannel}
                                    </span>
                                </td></tr>
                                <tr><th>Status</th><td>
                                    <span className={`badge ${
                                        notification.status === "READ" ? "bg-success" :
                                        notification.status === "UNREAD" ? "bg-danger" :
                                        "bg-secondary"
                                    }`}>
                                        {notification.status}
                                    </span>
                                </td></tr>
                            </tbody>
                        </table>
                        <button className="btn btn-danger me-2" onClick={handleDelete}>Yes, Delete</button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/Notification/findAllNotification")}  // ← fixed path
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}