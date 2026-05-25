import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllKPIReport() {

    const [kpiArr, setKpiArr] = useState([]);

    // ✅ FETCH DATA
    const fetchData = () => {
        let url = "http://localhost:9011/api/fetchAllKPIReports";

        axios.get(url)
            .then((response) => {
                setKpiArr(response.data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    // ✅ LOAD ONCE
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>KPI Reports</h2>

            <table border="1">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Scope</td>
                        <td>Metrics</td>
                        <td>Generated Date</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        kpiArr.map((k) => (
                            <tr key={k.reportId}>
                                <td>{k.reportId}</td>
                                <td>{k.scope}</td>
                                <td>{k.metrics}</td>
                                <td>{k.generatedDate}</td>

                                <td>
                                    {/* ✅ ROUTING-BASED DELETE */}
                                    <Link to={`/KPIReport/deleteKPIReport/${k.reportId}`}>
                                        Delete
                                    </Link>

                                    {" | "}

                                    {/* ✅ EDIT */}
                                    <Link to={`/KPIReport/updateKPIReport/${k.reportId}`}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
