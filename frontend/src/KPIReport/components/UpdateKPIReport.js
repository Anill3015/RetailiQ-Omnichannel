import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateKPIReport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");

<<<<<<< HEAD
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
=======
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findKPIReport/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            let r = response.data.kpiReport;

            setScope(r.scope);
            setMetrics(r.metrics);
        })
        .catch((error) => {
            console.error(error);
            setErrorMsg("Error loading KPI Report");
        });
>>>>>>> Rakesh

    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

<<<<<<< HEAD
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
=======
        setErrorMsg("");
        setSuccessMsg("");

        // ✅ Validation
        if (!scope || !metrics) {
            setErrorMsg("⚠️ Please fill all fields");
            return;
        }

        let url = `http://localhost:9011/api/updateKPIReport/${id}`;
        const token = localStorage.getItem("token");

        let data = {
            kpiReport: {
                scope,
                metrics
            }
        };

        axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setSuccessMsg("KPI Report updated successfully");

            setTimeout(() => {
                navigate("/KPIReport/findAllKPIReport");
            }, 1500);
        })
        .catch((error) => {
            console.error(error);

            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg( error.response.data);
                }
            } else {
                setErrorMsg("Update failed");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update KPI Report</h2>

            {/* ✅ Success */}
            {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
            )}

            {/* ✅ Error */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">ID</label>
                <input className="form-control" value={id} readOnly />
            </div>

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

            <button className="btn btn-success" onClick={handleUpdate}>
                Update
            </button>
>>>>>>> Rakesh
        </div>
    );
}