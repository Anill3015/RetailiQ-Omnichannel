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

export default function DeleteNotification() {
    const { nid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        const token = localStorage.getItem("token");

        // ✅ Send full object to match @RequestBody Notification
        axios.delete("http://localhost:9011/api/deleteNotification", {
            headers: { "Authorization": `Bearer ${token}` },
            data: {
                notificationId: parseInt(nid),
                userId: null,
                message: null,
                category: null,
                status: null,
                createdDate: null,
                readFlag: false
            }
        })
        .then((response) => {
            alert(response.data);
            navigate("/Notification/findAllNotification");
        })
        .catch((error) => {
            if (error.response) {
                alert("Delete failed: " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Delete Notification</h2>
            <p>Are you sure you want to delete Notification ID: <strong>{nid}</strong>?</p>
            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Notification/findNotification")}>Cancel</button>
>>>>>>> Rakesh
        </div>
    );
}