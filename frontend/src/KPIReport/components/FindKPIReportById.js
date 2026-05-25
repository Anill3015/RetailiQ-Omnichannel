import axios from "axios";
import { useState } from "react";

export default function FindKPIReportById() {

    const [id, setId] = useState("");
    const [report, setReport] = useState(null);

    // ✅ handle input
    const handleChange = (e) => {
        setId(e.target.value);
    };

    // ✅ search function
    const handleSearch = () => {

        axios.get(`http://localhost:9011/api/findKPIReport/${id}`)
            .then((response) => {

                let r = response.data.kpiReport;   // ✅ IMPORTANT

                setReport(r);
            })
            .catch((error) => {
                console.error(error);
                alert("❌ KPI Report not found");
                setReport(null);
            });
    };

    return (
        <div>
            <h2>Find KPI Report By ID</h2>

            <label>Enter ID:</label>
            <input value={id} onChange={handleChange} />

            <button onClick={handleSearch}>Search</button>

            <br /><br />

            {/* ✅ DISPLAY RESULT */}
            {
                report && (
                    <table border="1">
                        <tbody>

                            <tr>
                                <td>ID</td>
                                <td>{report.reportId}</td>
                            </tr>

                            <tr>
                                <td>Scope</td>
                                <td>{report.scope}</td>
                            </tr>

                            <tr>
                                <td>Metrics</td>
                                <td>{report.metrics}</td>
                            </tr>

                            <tr>
                                <td>Generated Date</td>
                                <td>
                                    {report.generatedDate
                                        ? new Date(report.generatedDate).toLocaleString()
                                        : "N/A"}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                )
            }
        </div>
    );
}
