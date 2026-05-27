import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateKPIReport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");

    // ✅ LOAD EXISTING DATA
    useEffect(() => {

        axios.get(`http://localhost:9011/api/findKPIReport/${id}`)
            .then((response) => {

                let r = response.data.kpiReport;   // ✅ important

                setScope(r.scope);
                setMetrics(r.metrics);
            })
            .catch((error) => {
                console.error(error);
                alert("Error loading KPI Report ❌");
            });

    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

        let url = `http://localhost:9011/api/updateKPIReport/${id}`;

        let data = {
            kpiReport: {
                scope: scope,
                metrics: metrics
                // generatedDate handled by backend
            }
        };

        axios.put(url, data)
            .then(() => {
                alert("✅ KPI Report updated successfully");

                // ✅ redirect back to list
                navigate("/KPIReport/findAllKPIReport");
            })
            .catch((error) => {
                console.error(error);
                alert("❌ Update failed");
            });
    };

    return (
        <div>
            <h2>Update KPI Report</h2>

            <label>ID</label>
            <input value={id} readOnly />
            <br />

            <label>Scope</label>
            <input value={scope} onChange={(e) => setScope(e.target.value)} />
            <br />

            <label>Metrics</label>
            <input value={metrics} onChange={(e) => setMetrics(e.target.value)} />
            <br />

            <button onClick={handleUpdate}>UPDATE</button>
        </div>
    );
}