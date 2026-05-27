import axios from "axios";
import { useState } from "react";

export default function FindKPIReportById() {

    const [id, setId] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter an ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findKPIReport/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const r = response.data.kpiReport;
            setReport(r);
            setError("");
        })
        .catch((error) => {
            console.error(error);
            setReport(null);
            setError("❌ KPI Report not found");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find KPI Report By ID</h2>

            <div className="mb-3">
                <label className="form-label">Enter ID</label>
                <input
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter KPI Report ID"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {report && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{report.reportId}</td>
                        </tr>

                        <tr>
                            <th>Scope</th>
                            <td>{report.scope}</td>
                        </tr>

                        <tr>
                            <th>Metrics</th>
                            <td>{report.metrics}</td>
                        </tr>

                        <tr>
                            <th>Generated Date</th>
                            <td>
                                {report.generatedDate
                                    ? new Date(report.generatedDate).toLocaleString()
                                    : "N/A"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}