<<<<<<< Updated upstream
<<<<<<< HEAD
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateNotification() {

    const { id } = useParams();
=======
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateNotification() {
    const { nid } = useParams();
>>>>>>> Rakesh
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateNotification() {
    const { id } = useParams();
>>>>>>> Stashed changes
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        message: "",
        category: "ORDER",
        deliveryChannel: "IN_APP",
        status: "NEW",
        readFlag: false
    });

<<<<<<< HEAD
    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        axios.get(`http://localhost:9011/api/findNotification/${id}`)
            .then((response) => {
                let n = response.data;   // ✅ controller returns Notification directly (no wrapper)

                setUserId(n.userId);
                setMessage(n.message);
                setCategory(n.category);
                setStatus(n.status);
                setCreatedDate(n.createdDate ? n.createdDate.split("T")[0] : "");
                // ✅ split to get yyyy-MM-dd for date input
                setReadFlag(n.readFlag);
            })
            .catch((error) => {
                console.error(error);
                alert("Error loading notification");
            });
    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

        let url = "http://localhost:9011/api/updateNotification";

        let data = {
            notification: {
                notificationId: parseInt(id),   // ✅ needed for update
=======
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/fetchNotificationById/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setFormData(res.data))
        .catch((error) => console.error("Error:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
<<<<<<< Updated upstream
        const formattedDate = createdDate ? createdDate + ":00" : null;

        const data = {
            notification: {
                notificationId: parseInt(nid),
>>>>>>> Rakesh
                userId: parseInt(userId),
                message: message,
                category: category,
                status: status,
<<<<<<< HEAD
                createdDate: createdDate + "T00:00:00",  // ✅ LocalDateTime format
                readFlag: readFlag                        // ✅ boolean
            }
        };

        axios.post(url, data)
            .then(() => {
                alert("Notification updated successfully");
                navigate("/Notification/findAllNotification");  // ✅ redirect to list
            })
            .catch((error) => {
                console.error(error);
                alert("Update failed: " + error.message);
            });
    };

    return (
        <div>
            <h2>Update Notification</h2>

            <label>ID</label>
            <input value={id} readOnly />
            <br />

            <label>User ID</label>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} type="number" />
            <br />

            <label>Message</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <br />

            <label>Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
            <br />

            <label>Status</label>
            <input value={status} onChange={(e) => setStatus(e.target.value)} />
            <br />

            <label>Created Date</label>
            <input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
            <br />

            <label>Read Flag</label>
            <input
                type="checkbox"
                checked={readFlag}
                onChange={(e) => setReadFlag(e.target.checked)}
            />
            <br />

            <button onClick={handleUpdate}>UPDATE</button>
=======
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
=======
        axios.put(`http://localhost:9011/api/updateNotification/${id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
>>>>>>> Stashed changes
        })
        .then(() => navigate("/Notification/findNotification"))
        .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Notification</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="ORDER">ORDER</option>
                        <option value="INVENTORY">INVENTORY</option>
                        <option value="PROMOTION">PROMOTION</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Delivery Channel</label>
                    <select
                        className="form-select"
                        name="deliveryChannel"
                        value={formData.deliveryChannel}
                        onChange={handleChange}
                    >
                        <option value="IN_APP">IN_APP</option>
                        <option value="EMAIL">EMAIL</option>
                        <option value="SMS">SMS</option>
                        <option value="WEBHOOK">WEBHOOK</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="NEW">NEW</option>
                        <option value="UNREAD">UNREAD</option>
                        <option value="READ">READ</option>
                    </select>
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="readFlag"
                        checked={formData.readFlag}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Read Flag</label>
                </div>

<<<<<<< Updated upstream
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
>>>>>>> Rakesh
=======
                <button type="submit" className="btn btn-warning me-2">Update</button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/Notification/findNotification")}
                >
                    Cancel
                </button>
            </form>
>>>>>>> Stashed changes
        </div>
    );
}