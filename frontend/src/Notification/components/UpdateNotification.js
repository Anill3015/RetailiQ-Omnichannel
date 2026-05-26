import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateNotification() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [readFlag, setReadFlag] = useState(false);

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
                userId: parseInt(userId),
                message: message,
                category: category,
                status: status,
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
        </div>
    );
}