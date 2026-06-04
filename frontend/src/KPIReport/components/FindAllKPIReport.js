import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllKPIReport() {

    const [kpiArr, setKpiArr] = useState([]);

<<<<<<< HEAD
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
=======
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

>>>>>>> Rakesh
    useEffect(() => {
        fetchData();
    }, []);

    return (
<<<<<<< HEAD
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
=======
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
>>>>>>> Rakesh
