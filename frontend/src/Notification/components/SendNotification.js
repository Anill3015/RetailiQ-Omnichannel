import axios from "axios";
import { useState } from "react";

export default function SendNotification() {
    const [formData, setFormData] = useState({
        userId: "",
        message: "",
        category: "ORDER",
        channel: "IN_APP"
    });
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSend = () => {
        const token = localStorage.getItem("token");
        const channelMap = {
            IN_APP: "sendInApp",
            EMAIL: "sendEmail",
            SMS: "sendSms",
            WEBHOOK: "sendWebhook"
        };
        const endpoint = channelMap[formData.channel];

        axios.post(
            `http://localhost:9011/api/${endpoint}/${formData.userId}?message=${encodeURIComponent(formData.message)}&category=${formData.category}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
            setSuccessMsg(`Notification sent via ${formData.channel} successfully!`);
            setErrorMsg("");
            setFormData({ userId: "", message: "", category: "ORDER", channel: "IN_APP" });
        })
        .catch(() => {
            setErrorMsg("Failed to send notification.");
            setSuccessMsg("");
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Send Notification</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input
                    type="number"
                    className="form-control"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
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
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                    <option value="ORDER">ORDER</option>
                    <option value="INVENTORY">INVENTORY</option>
                    <option value="PROMOTION">PROMOTION</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Delivery Channel</label>
                <select className="form-select" name="channel" value={formData.channel} onChange={handleChange}>
                    <option value="IN_APP">IN_APP</option>
                    <option value="EMAIL">EMAIL</option>
                    <option value="SMS">SMS</option>
                    <option value="WEBHOOK">WEBHOOK</option>
                </select>
            </div>

            <button className="btn btn-primary" onClick={handleSend}>Send Notification</button>
        </div>
    );
}