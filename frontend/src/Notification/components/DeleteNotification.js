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
        </div>
    );
}