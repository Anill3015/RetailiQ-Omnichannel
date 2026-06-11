import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateNotification() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        message: "",
        category: "ORDER",
        deliveryChannel: "IN_APP",
        status: "NEW",
        readFlag: false
    });

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

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
        axios.put(`http://localhost:9011/api/updateNotification/${id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setSuccessMsg("Notification updated successfully!");
            setErrorMsg("");
            setTimeout(() => navigate("/Notification/findAllNotification"), 2000);
        })
        .catch((error) => {
            setErrorMsg("Update failed. Please try again.");
            setSuccessMsg("");
            console.error("Error:", error);
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Notification</h2>

            {successMsg && (
                <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2">
                    <span>✅</span>
                    <strong>{successMsg}</strong>
                    <span className="ms-2 text-muted" style={{ fontSize: "13px" }}>Redirecting...</span>
                    <button type="button" className="btn-close ms-auto" onClick={() => setSuccessMsg("")} />
                </div>
            )}

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2">
                    <span>❌</span>
                    <strong>{errorMsg}</strong>
                    <button type="button" className="btn-close ms-auto" onClick={() => setErrorMsg("")} />
                </div>
            )}

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
                        <option value="INTEGRATION">INTEGRATION</option>
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

                <button type="submit" className="btn btn-warning me-2">Update</button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/Notification/findAllNotification")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}