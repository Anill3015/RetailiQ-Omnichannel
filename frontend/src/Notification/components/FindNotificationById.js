import axios from "axios";
import { useState } from "react";

export default function FindNotificationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);

    const handleSearch = () => {

        if (!id) {
            alert("Please enter ID");
            return;
        }

        axios.get(`http://localhost:9011/api/findNotification/${id}`)
            .then((response) => {
                setData(response.data);  // ✅ controller returns Notification directly (no wrapper)
            })
            .catch((error) => {
                console.error(error);
                alert("Notification not found");
                setData(null);
            });
    };

    return (
        <div>
            <h2>Find Notification By ID</h2>

            <div>
                <label>Enter Notification ID: </label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <br />

            {data && (
                <table border="1" cellPadding="6">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Notification ID</td>
                            <td>{data.notificationId}</td>
                        </tr>

                        <tr>
                            <td>User ID</td>
                            <td>{data.userId}</td>
                        </tr>

                        <tr>
                            <td>Message</td>
                            <td>{data.message}</td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>{data.category}</td>
                        </tr>

                        <tr>
                            <td>Status</td>
                            <td>{data.status}</td>
                        </tr>

                        <tr>
                            <td>Created Date</td>
                            <td>{data.createdDate ? data.createdDate.split("T")[0] : "N/A"}</td>
                            {/* ✅ LocalDateTime → show date part only */}
                        </tr>

                        <tr>
                            <td>Read Flag</td>
                            <td>{data.readFlag ? "Yes" : "No"}</td>
                            {/* ✅ boolean → readable text */}
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}