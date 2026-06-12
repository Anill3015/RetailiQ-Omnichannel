import axios from "axios";
import { useState } from "react";

export default function FindExceptionEventById() {

    const [id, setId] = useState("");
    const [event, setEvent] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = () => {

        setErrorMsg("");
        setEvent(null);

        if (!id) {
            setErrorMsg("Please enter Exception Event ID");
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
        })
        .catch((err) => {
            setEvent(null);

            if (err.response && err.response.data) {
                if (typeof err.response.data === "string") {
                    setErrorMsg(err.response.data);
                } else if (err.response.data.error) {
                    setErrorMsg(err.response.data.error);
                } else if (err.response.data.message) {
                    setErrorMsg(err.response.data.message);
                } else {
                    setErrorMsg("Record not found");
                }
            } else {
                setErrorMsg("Server not reachable");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Exception Event By ID</h2>

            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">
                    Enter ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter Exception ID"
                />
                {!id && errorMsg && (
                    <small className="text-danger">
                        Exception Event ID is required
                    </small>
                )}
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

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