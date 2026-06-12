import axios from "axios";
import { useState } from "react";

export default function CreateNotification() {

    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [readFlag, setReadFlag] = useState(false);

    const saveHandler = () => {
        const url = "http://localhost:9011/api/addNotification";
        const data = {
            notification: {
                userId: parseInt(userId),
                message: message,
                category: category,
                status: status,
                createdDate: createdDate + "T00:00:00",  // ✅ LocalDateTime format
                readFlag: readFlag                        // ✅ boolean
            }
        };

        axios.post(url, data)
            .then((response) => {
                alert("Notification added successfully!");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create Notification</h2>

            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                    className="form-control"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {/* ✅ matches Notification category from project doc */}
                    <option value="">-- Select Category --</option>
                    <option value="Order">Order</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Integration">Integration</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">-- Select Status --</option>
                    <option value="UNREAD">UNREAD</option>
                    <option value="READ">READ</option>
                    <option value="NEW">NEW</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Created Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="readFlagCheck"
                    checked={readFlag}
                    onChange={(e) => setReadFlag(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="readFlagCheck">
                    Read Flag
                </label>
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>SAVE</button>
        </div>
    );
}