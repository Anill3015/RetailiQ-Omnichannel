import axios from "axios";
import { useState } from "react";

export default function CreateKPIReport() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");

    const handleCreate = () => {

        let url = "http://localhost:9011/api/addKPIReport";

        let data = {
            kpiReport: {
                scope: scope,        // ✅ FIXED
                metrics: metrics     // ✅ FIXED
                // generatedDate optional (backend can set)
            }
        };

        axios.post(url, data)
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
        <div>
            <h2>Create KPI Report</h2>

            <label>Scope</label>
            <input value={scope} onChange={(e) => setScope(e.target.value)} />
            <br />

            <label>Metrics</label>
            <input value={metrics} onChange={(e) => setMetrics(e.target.value)} />
            <br />

            <button onClick={handleCreate}>CREATE</button>
        </div>
    );
}