import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllKPIReport() {

    const [kpiArr, setKpiArr] = useState([]);

    const fetchData = () => {
        const url = "http://localhost:9011/api/fetchAllKPIReports";
        const token = localStorage.getItem("token");

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setKpiArr(response.data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">KPI Reports</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Scope</th>
                            <th>Metrics</th>
                            <th>Generated Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {kpiArr.length > 0 ? (
                            kpiArr.map((k) => (
                                <tr key={k.reportId}>
                                    <td>{k.reportId}</td>
                                    <td>{k.scope}</td>
                                    <td>{k.metrics}</td>
                                    <td>{k.generatedDate}</td>

                                    <td>
                                        <Link
                                            to={`/KPIReport/deleteKPIReport/${k.reportId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>

                                        <Link
                                            to={`/KPIReport/updateKPIReport/${k.reportId}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No KPI Reports Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}