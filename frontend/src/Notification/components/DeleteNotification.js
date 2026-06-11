<<<<<<< Updated upstream
<<<<<<< HEAD
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteNotification() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    useEffect(() => {

        const confirmDelete = window.confirm("Are you sure you want to delete this Notification?");

        if (confirmDelete) {

            // ✅ now matches @DeleteMapping("/deleteNotification/{id}")
            axios.delete(`http://localhost:9011/api/deleteNotification/${id}`)
                .then(() => {
                    setStatus("Notification deleted successfully");
                    setTimeout(() => {
                        navigate("/Notification/findAllNotification");
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                    setStatus("Delete failed: " + error.message);
                });

        } else {
            navigate("/Notification/findAllNotification");
        }

    }, [id, navigate]);

    return (
        <div>
            <h2>Delete Notification</h2>
            <p>{status}</p>
=======
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
>>>>>>> Stashed changes

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
        .then(() => navigate("/Notification/findNotification"))
        .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="container mt-4">
<<<<<<< Updated upstream
            <h2>Delete Notification</h2>
            <p>Are you sure you want to delete Notification ID: <strong>{nid}</strong>?</p>
            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Notification/findNotification")}>Cancel</button>
>>>>>>> Rakesh
=======
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
                                <tr><th>Category</th><td><span className="badge bg-primary">{notification.category}</span></td></tr>
                                <tr><th>Delivery Channel</th><td><span className="badge bg-secondary">{notification.deliveryChannel}</span></td></tr>
                                <tr><th>Status</th><td><span className={`badge ${notification.status === "READ" ? "bg-success" : notification.status === "UNREAD" ? "bg-danger" : "bg-secondary"}`}>{notification.status}</span></td></tr>
                            </tbody>
                        </table>
                        <button className="btn btn-danger me-2" onClick={handleDelete}>Yes, Delete</button>
                        <button className="btn btn-secondary" onClick={() => navigate("/Notification/findNotification")}>Cancel</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
>>>>>>> Stashed changes
        </div>
    );
}