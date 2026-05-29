import axios from "axios";
import { useState } from "react";

export default function CreateKPIReport() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");

    const handleCreate = () => {
        const token = localStorage.getItem("token");

        const url = "http://localhost:9011/api/addKPIReport";

        const data = {
            kpiReport: {
                scope: scope,
                metrics: metrics
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("✅ KPI Report created successfully");
            setScope("");
            setMetrics("");
        })
        .catch((err) => {
            console.error(err);
            alert("❌ Error creating KPI Report");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create KPI Report</h2>

            <div className="mb-3">
                <label className="form-label">Scope</label>
                <input
                    className="form-control"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="Enter scope"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Metrics</label>
                <input
                    className="form-control"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    placeholder="Enter metrics"
                />
            </div>

            <button className="btn btn-success" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}