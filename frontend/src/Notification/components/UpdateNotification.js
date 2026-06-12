import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateNotification() {
    const { nid } = useParams();
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [readFlag, setReadFlag] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // ✅ Correct URL + token
        axios.get(`http://localhost:9011/api/findNotification/${nid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            const n = response.data;
            setUserId(n.userId || "");
            setMessage(n.message || "");
            setCategory(n.category || "");
            setStatus(n.status || "");
            setCreatedDate(n.createdDate ? n.createdDate.substring(0, 16) : "");
            setReadFlag(n.readFlag || false);
        })
        .catch((error) => {
            if (error.response) {
                alert("Error loading notification: " + error.response.status);
            } else if (error.request) {
                alert("No response from server.");
            } else {
                alert("Error loading notification");
            }
        });
    }, [nid]);

    const updateHandler = () => {
        if (!userId || !message) {
            alert("User ID and Message are required");
            return;
        }

        const token = localStorage.getItem("token");
        const formattedDate = createdDate ? createdDate + ":00" : null;

        const data = {
            notification: {
                notificationId: parseInt(nid),
                userId: parseInt(userId),
                message: message,
                category: category,
                status: status,
                createdDate: formattedDate,
                readFlag: readFlag
            }
        };

        // ✅ Backend uses @PostMapping for update
        axios.post("http://localhost:9011/api/updateNotification", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            alert("Notification Updated! " + response.data.message);
            navigate("/Notification/findAllNotification");
        })
        .catch((error) => {
            if (error.response) {
                alert("Error " + error.response.status + ": " + JSON.stringify(error.response.data));
            } else if (error.request) {
                alert("No response from server.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Notification</h2>

            <div className="mb-3">
                <label className="form-label">Notification ID</label>
                <input className="form-control" type="text" value={nid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input className="form-control" type="number" value={userId}
                    onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Message</label>
                <input className="form-control" type="text" value={message}
                    onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <input className="form-control" type="text" value={category}
                    onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input className="form-control" type="text" value={status}
                    onChange={(e) => setStatus(e.target.value)} placeholder="Enter status" />
            </div>

            <div className="mb-3">
                <label className="form-label">Created Date</label>
                <input className="form-control" type="datetime-local" value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Read Flag</label>
                <select className="form-control" value={readFlag}
                    onChange={(e) => setReadFlag(e.target.value === "true")}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            <button className="btn btn-primary me-2" onClick={updateHandler}>Update</button>
            <button className="btn btn-secondary"
                onClick={() => navigate("/Notification/findAllNotification")}>Cancel</button>
        </div>
    );
}