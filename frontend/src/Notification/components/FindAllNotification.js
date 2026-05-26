import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllNotification() {

    const [notificationList, setNotificationList] = useState([]);

    // ✅ Fetch all notifications
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

    // ✅ Load on page start
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Notifications List</h2>

            <table border="1" cellPadding="5">
                <thead>
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
                    {
                        notificationList.length > 0 ? (
                            notificationList.map((n) => (
                                <tr key={n.notificationId}>
                                    <td>{n.notificationId}</td>
                                    <td>{n.userId}</td>
                                    <td>{n.message}</td>
                                    <td>{n.category}</td>
                                    <td>{n.status}</td>
                                    <td>{n.createdDate ? n.createdDate.replace("T", " ") : "N/A"}</td>
                                    {/* ✅ LocalDateTime comes as array [2025,4,3,0,0,0] from Spring */}
                                    <td>{n.readFlag ? "Yes" : "No"}</td>
                                    {/* ✅ boolean rendered as Yes/No */}

                                    <td>
                                        <Link to={`/Notification/deleteNotification/${n.notificationId}`}>
                                            Delete
                                        </Link>
                                        {" | "}
                                        <Link to={`/Notification/updateNotification/${n.notificationId}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No Notifications Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}