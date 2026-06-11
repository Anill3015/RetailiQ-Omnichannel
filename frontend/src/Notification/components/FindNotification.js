import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindNotification() {

    const [notificationList, setNotificationList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const itemsPerPage = 10;

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/fetchAllNotifications", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setNotificationList(res.data))
        .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMarkAsRead = (id) => {
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:9011/api/markAsRead/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => fetchData())
        .catch((error) => console.error("Error:", error));
    };

    const filtered = notificationList.filter((n) => {
        return (
            (filterCategory === "" || n.category === filterCategory) &&
            (filterStatus === "" || n.status === filterStatus)
        );
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Notifications List</h2>

            <div className="d-flex gap-3 mb-3">
                <select
                    className="form-select w-auto"
                    value={filterCategory}
                    onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                >
                    <option value="">All Categories</option>
                    <option value="ORDER">ORDER</option>
                    <option value="INVENTORY">INVENTORY</option>
                    <option value="PROMOTION">PROMOTION</option>
                    <option value="INTEGRATION">INTEGRATION</option>
                </select>

                <select
                    className="form-select w-auto"
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                >
                    <option value="">All Statuses</option>
                    <option value="NEW">NEW</option>
                    <option value="UNREAD">UNREAD</option>
                    <option value="READ">READ</option>
                </select>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Notification ID</th>
                            <th>User ID</th>
                            <th>Message</th>
                            <th>Category</th>
                            <th>Delivery Channel</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Read Flag</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((n) => (
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
                                    <td>
                                        <span className={`badge ${
                                            n.status === "READ" ? "bg-success" :
                                            n.status === "UNREAD" ? "bg-danger" :
                                            "bg-secondary"
                                        }`}>
                                            {n.status}
                                        </span>
                                    </td>
                                    <td>{n.createdDate ? n.createdDate.replace("T", " ") : "N/A"}</td>
                                    <td>
                                        <span className={`badge ${n.readFlag ? "bg-success" : "bg-warning text-dark"}`}>
                                            {n.readFlag ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td>
                                        {!n.readFlag && (
                                            <button
                                                className="btn btn-success btn-sm me-1"
                                                onClick={() => handleMarkAsRead(n.notificationId)}
                                            >
                                                Mark Read
                                            </button>
                                        )}
                                        <Link
                                            to={`/Notification/deleteNotification/${n.notificationId}`}
                                            className="btn btn-danger btn-sm me-1"
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
                                <td colSpan="9" className="text-center">No Notifications Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {filtered.length > 0 && (
                <div className="d-flex align-items-center gap-2 mt-3">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        style={{
                            padding: "7px 18px",
                            borderRadius: "6px",
                            border: "2px solid #3a85c7",
                            backgroundColor: "#ffffff",
                            color: currentPage === 1 ? "#3a85c7" : "#1a6ab5",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                            opacity: currentPage === 1 ? 0.5 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: "14px", color: "#333", fontWeight: "500", padding: "0 4px" }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: "7px 18px",
                            borderRadius: "6px",
                            border: "2px solid #3a85c7",
                            backgroundColor: "#ffffff",
                            color: currentPage === totalPages ? "#3a85c7" : "#1a6ab5",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}