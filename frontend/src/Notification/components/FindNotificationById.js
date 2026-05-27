import axios from "axios";
import { useState } from "react";

export default function FindNotificationById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter a Notification ID");
            return;
        }
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findNotification/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data);
                setError("");
            })
            .catch((error) => {
                setData(null);
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Find Notification By ID</h2>

            <div className="mb-3">
                <label className="form-label">Notification ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Notification ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>Search</button>

            {/* ✅ error alert */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* ✅ result table */}
            {data && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Notification ID</th><td>{data.notificationId}</td></tr>
                        <tr><th>User ID</th>        <td>{data.userId}</td></tr>
                        <tr><th>Message</th>        <td>{data.message}</td></tr>
                        <tr><th>Category</th>       <td>{data.category}</td></tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                {/* ✅ color badge for status */}
                                <span className={`badge ${data.status === "READ" ? "bg-success" : data.status === "UNREAD" ? "bg-danger" : "bg-secondary"}`}>
                                    {data.status}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Created Date</th>
                            <td>{data.createdDate ? data.createdDate.split("T")[0] : "N/A"}</td>
                        </tr>
                        <tr>
                            <th>Read Flag</th>
                            <td>
                                {/* ✅ color badge for readFlag */}
                                <span className={`badge ${data.readFlag ? "bg-success" : "bg-warning text-dark"}`}>
                                    {data.readFlag ? "Yes" : "No"}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}