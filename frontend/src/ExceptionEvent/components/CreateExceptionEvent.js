import axios from "axios";
import { useState } from "react";

export default function AddExceptionEvent() {

    const [type, setType] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    const saveHandler = () => {

        const url = "http://localhost:9011/api/addExceptionEvent";
        const token = localStorage.getItem("token");

        const data = {
            exceptionEvent: {
                type,
                referenceId,
                severity,
                status
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert("Exception Event added successfully");
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
            alert("Error adding exception event");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Add Exception Event</h2>

            <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter type"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Reference ID</label>
                <input
                    className="form-control"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Enter reference ID"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Severity</label>
                <input
                    className="form-control"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    placeholder="Enter severity"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
                />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>
                Save
            </button>
        </div>
    );
}
