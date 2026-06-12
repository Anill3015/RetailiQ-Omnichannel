import axios from "axios";
import { useState } from "react";

export default function FindKPIReportById() {

    const [id, setId] = useState("");
    const [report, setReport] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = () => {

        setErrorMsg("");
        setReport(null);

        if (!id) {
            setErrorMsg("Please enter KPI Report ID");
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
        })
        .catch((error) => {
            console.error(error);
            setReport(null);

            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg("KPI Report not found");
                }
            } else {
                setErrorMsg("KPI Report not found");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find KPI Report By ID</h2>

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
                    placeholder="Enter KPI Report ID"
                />
                {!id && errorMsg && (
                    <small className="text-danger">
                        KPI Report ID is required
                    </small>
                )}
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

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
