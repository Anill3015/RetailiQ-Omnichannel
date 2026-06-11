import axios from "axios";
import { useState } from "react";

export default function CreateKPIReport() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleCreate = () => {

        setErrorMsg("");
        setSuccessMsg("");

        // ✅ Validation
        if (!scope || !metrics) {
            setErrorMsg("⚠️ Please fill all fields");
            return;
        }

        const token = localStorage.getItem("token");
        const url = "http://localhost:9011/api/addKPIReport";

        const data = {
            kpiReport: {
                scope,
                metrics
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setSuccessMsg("KPI Report created successfully");

            setScope("");
            setMetrics("");
        })
        .catch((err) => {
            console.error(err);

            if (err.response && err.response.data) {
                setErrorMsg((err.response.data.message || err.response.data));
            } else {
                setErrorMsg("Error creating KPI Report");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create KPI Report</h2>

            {/* ✅ Success */}
            {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
            )}

            {/* ✅ Error */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            {/* Scope */}
            <div className="mb-3">
                <label className="form-label">
                    Scope <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={scope}
                    onChange={(e) => {
                        setScope(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter scope"
                />
                {!scope && errorMsg && (
                    <small className="text-danger">Scope is required</small>
                )}
            </div>

            {/* Metrics */}
            <div className="mb-3">
                <label className="form-label">
                    Metrics <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={metrics}
                    onChange={(e) => {
                        setMetrics(e.target.value);
                        setErrorMsg("");
                    }}
                    placeholder="Enter metrics"
                />
                {!metrics && errorMsg && (
                    <small className="text-danger">Metrics is required</small>
                )}
            </div>

            <button className="btn btn-success" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}