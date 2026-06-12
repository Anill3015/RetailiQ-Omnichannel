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
        </div>
    );
}