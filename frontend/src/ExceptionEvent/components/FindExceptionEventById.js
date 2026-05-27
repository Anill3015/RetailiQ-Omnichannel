import axios from "axios";
import { useState } from "react";

export default function FindExceptionEventById() {

    const [id, setId] = useState("");
    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter an ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findExceptionEvent/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const e = response.data.exceptionEvent;
            setEvent(e);
            setError("");
        })
        .catch((err) => {
            console.error(err);
            setEvent(null);
            setError("Record not found ❌");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Exception Event By ID</h2>

            <div className="mb-3">
                <label className="form-label">Enter ID</label>
                <input
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Exception ID"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {event && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{event.exceptionId}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{event.type}</td>
                        </tr>
                        <tr>
                            <th>Reference ID</th>
                            <td>{event.referenceId}</td>
                        </tr>
                        <tr>
                            <th>Severity</th>
                            <td>{event.severity}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{event.status}</td>
                        </tr>
                        <tr>
                            <th>Detected Date</th>
                            <td>{event.detectedDate}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
