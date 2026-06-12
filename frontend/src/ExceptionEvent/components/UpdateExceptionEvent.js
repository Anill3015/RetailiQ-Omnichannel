import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateExceptionEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findExceptionEvent/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            let e = response.data.exceptionEvent;

            setType(e.type);
            setReferenceId(e.referenceId);
            setSeverity(e.severity);
            setStatus(e.status);
        })
        .catch((err) => {
            console.error(err);
            setErrorMsg("❌ Error loading data");
        });

    }, [id]);

    // ✅ UPDATE FUNCTION
    const updateHandler = () => {

        if (!type || !referenceId || !severity || !status) {
            setErrorMsg("⚠️ Please fill all fields");
            return;
        }

        setErrorMsg("");

        const url = `http://localhost:9011/api/updateExceptionEvent/${id}`;
        const token = localStorage.getItem("token");

        const data = {
            exceptionEvent: {
                type,
                referenceId,
                severity,
                status
            }
        };

        axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("Updated successfully");
            navigate("/ExceptionEvent/findAllExceptionEvent");
        })
        .catch((err) => {
            console.error(err);
            setErrorMsg("Update failed");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Edit Exception Event</h2>

            {/* ✅ Global Error */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">ID</label>
                <input className="form-control" value={id} readOnly />
            </div>

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
                <label className="form-label">
                    Reference ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Enter reference ID"
                />
                {!referenceId && errorMsg && (
                    <small className="text-danger">
                        Reference ID is mandatory
                    </small>
                )}
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
                <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>OPEN</option>
                    <option>IN_PROGRESS</option>
                    <option>RESOLVED</option>
                </select>
            </div>

            <button className="btn btn-primary" onClick={updateHandler}>
                Update
            </button>
        </div>
    );
}