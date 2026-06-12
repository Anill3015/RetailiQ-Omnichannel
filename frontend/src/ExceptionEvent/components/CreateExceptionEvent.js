import axios from "axios";
import { useState } from "react";

export default function AddExceptionEvent() {

    const [type, setType] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [severity, setSeverity] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const saveHandler = () => {

        if (!type || !referenceId || !severity) {
            setErrorMsg("All fields are required");
            return;
        }

        setErrorMsg("");

        const url = "http://localhost:9011/api/addExceptionEvent";
        const token = localStorage.getItem("token");

        const data = {
            exceptionEvent: {
                type,
                referenceId,
                severity
            }
        };

        axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Exception Event added successfully");

            setType("");
            setReferenceId("");
            setSeverity("");
        })
        .catch(() => {
            setErrorMsg("Error adding event");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Add Exception Event</h2>

            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">
                    Type <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter type (e.g., STOCKOUT, ORDER_FAILED)"
                />
                {!type && errorMsg && (
                    <small className="text-danger">Type is required</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Reference ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Enter reference ID (orderId / productId)"
                />
                {!referenceId && errorMsg && (
                    <small className="text-danger">Reference ID is required</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Severity <span style={{ color: "red" }}>*</span>
                </label>
                <select
                    className="form-control"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                >
                    <option value="">Select Severity</option>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>
                {!severity && errorMsg && (
                    <small className="text-danger">Severity is required</small>
                )}
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>
                Save
            </button>
        </div>
    );
}