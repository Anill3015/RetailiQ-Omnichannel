import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllNotification() {

    const [notificationList, setNotificationList] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:9011/api/fetchAllNotifications")
            .then((response) => {
                setNotificationList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Failed to load notifications");
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Notifications List</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Notification ID</th>
                            <th>User ID</th>
                            <th>Message</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Read Flag</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {notificationList.length > 0 ? (
                            notificationList.map((n) => (
                                <tr key={n.notificationId}>
                                    <td>{n.notificationId}</td>
                                    <td>{n.userId}</td>
                                    <td>{n.message}</td>
                                    <td>{n.category}</td>
                                    <td>
                                        {/* ✅ color badge based on status */}
                                        <span className={`badge ${n.status === "READ" ? "bg-success" : n.status === "UNREAD" ? "bg-danger" : "bg-secondary"}`}>
                                            {n.status}
                                        </span>
                                    </td>
                                    <td>{n.createdDate ? n.createdDate.replace("T", " ") : "N/A"}</td>
                                    <td>
                                        {/* ✅ color badge for readFlag */}
                                        <span className={`badge ${n.readFlag ? "bg-success" : "bg-warning text-dark"}`}>
                                            {n.readFlag ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/Notification/deleteNotification/${n.notificationId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>
                                        <Link
                                            to={`/Notification/updateNotification/${n.notificationId}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No Notifications Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}