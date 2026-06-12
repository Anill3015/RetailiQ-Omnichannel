import axios from "axios";
import { useEffect, useState } from "react";

export default function UnreadNotifications() {
    const [unreadList, setUnreadList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchUnread = () => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:9011/api/fetchAllNotifications", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // Filter unread on frontend — readFlag false means unread
            const unread = res.data.filter(n => n.readFlag === false);
            setUnreadList(unread);
            setLoading(false);
            setErrorMsg("");
        })
        .catch((error) => {
            console.error("Error:", error.response || error);
            setErrorMsg("Failed to fetch unread notifications.");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchUnread();
    }, []);

    const handleMarkAsRead = (id) => {
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:9011/api/markAsRead/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => fetchUnread())
        .catch((error) => console.error("Error:", error));
    };

    const handleMarkAllAsRead = () => {
        const token = localStorage.getItem("token");
        Promise.all(
            unreadList.map(n =>
                axios.put(`http://localhost:9011/api/markAsRead/${n.notificationId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            )
        ).then(() => fetchUnread())
         .catch((error) => console.error("Error:", error));
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex align-items-center gap-2">
                    <div className="spinner-border spinner-border-sm text-primary"></div>
                    <span>Loading unread notifications...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">
                    Unread Notifications
                    {unreadList.length > 0 && (
                        <span className="badge bg-danger ms-2">{unreadList.length}</span>
                    )}
                </h2>
                {unreadList.length > 0 && (
                    <button
                        className="btn btn-success btn-sm"
                        onClick={handleMarkAllAsRead}
                    >
                        ✅ Mark All as Read
                    </button>
                )}
            </div>

            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            {!errorMsg && unreadList.length === 0 ? (
                <div className="alert alert-success">✅ No unread notifications!</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Message</th>
                                <th>Category</th>
                                <th>Delivery Channel</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unreadList.map((n) => (
                                <tr key={n.notificationId}>
                                    <td>{n.notificationId}</td>
                                    <td>{n.userId}</td>
                                    <td>{n.message}</td>
                                    <td>
                                        <span className={`badge ${
                                            n.category === "ORDER" ? "bg-primary" :
                                            n.category === "INVENTORY" ? "bg-warning text-dark" :
                                            n.category === "PROMOTION" ? "bg-success" :
                                            n.category === "INTEGRATION" ? "bg-info text-dark" :
                                            "bg-secondary"
                                        }`}>
                                            {n.category}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${
                                            n.deliveryChannel === "EMAIL" ? "bg-info text-dark" :
                                            n.deliveryChannel === "SMS" ? "bg-primary" :
                                            n.deliveryChannel === "WEBHOOK" ? "bg-dark" :
                                            "bg-secondary"
                                        }`}>
                                            {n.deliveryChannel}
                                        </span>
                                    </td>
                                    <td>{n.createdDate ? n.createdDate.replace("T", " ") : "N/A"}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleMarkAsRead(n.notificationId)}
                                        >
                                            Mark as Read
                                        </button>
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