import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationHome() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // make sure userId is stored on login
        if (userId) {
            axios.get(`http://localhost:9011/api/countUnread/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setUnreadCount(res.data))
            .catch((error) => console.error("Error:", error));
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Notifications</span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createNotification">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findNotificationById">Find By ID</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllNotification">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="unreadNotifications">
                            Unread
                            {unreadCount > 0 && (
                                <span className="badge bg-danger ms-1">{unreadCount}</span>
                            )}
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findNotificationById">Find NotificationById</Link>
                    </li>
                    <li>
                        <Link to="findAllNotification">FindAll Notification</Link>
 
                    </li>
=======
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="sendNotification">Send</Link>
                    </li>
<<<<<<< Updated upstream
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findNotificationById">
                            Find By ID
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllNotification">
                            Find All
                        </Link>
                    </li>
                    <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
>>>>>>> Rakesh
=======
                    <button className="btn btn-danger btn-sm ms-2" onClick={logout}>Logout</button>
>>>>>>> Stashed changes
                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}