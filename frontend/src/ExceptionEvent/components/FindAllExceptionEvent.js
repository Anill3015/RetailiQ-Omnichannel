import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllExceptionEvent() {

    const [eventArr, setEventData] = useState([]);
    const [filter, setFilter] = useState("");

    const token = localStorage.getItem("token");

    const fetchData = () => {

        let url = "http://localhost:9011/api/fetchAllExceptionEvents";

        if (filter) {
            url = `http://localhost:9011/api/filterByStatus?status=${filter}`;
        }

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setEventData(response.data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    // ✅ Status color
    const getColor = (status) => {
        if (status === "OPEN") return "danger";
        if (status === "IN_PROGRESS") return "warning";
        if (status === "RESOLVED") return "success";
    };

    // ✅ Quick update
    const updateStatus = (e, status) => {

        const data = {
            exceptionEvent: {
                type: e.type,
                referenceId: e.referenceId,
                severity: e.severity,
                status: status
            }
        };

        axios.put(`http://localhost:9011/api/updateExceptionEvent/${e.exceptionId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => fetchData())
        .catch(err => console.error(err));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Exception Events</h2>

            {/* ✅ FILTER */}
            <select
                className="form-select mb-3"
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="">All</option>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
            </select>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Reference ID</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Detected Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {eventArr.length > 0 ? (
                            eventArr.map((e) => (
                                <tr key={e.exceptionId}>
                                    <td>{e.exceptionId}</td>
                                    <td>{e.type}</td>
                                    <td>{e.referenceId}</td>
                                    <td>{e.severity}</td>

                                    {/* ✅ STATUS BADGE */}
                                    <td>
                                        <span className={`badge bg-${getColor(e.status)}`}>
                                            {e.status}
                                        </span>
                                    </td>

                                    <td>{e.detectedDate}</td>

                                    <td>

                                        {/* ✅ QUICK ACTION */}
                                        {e.status !== "RESOLVED" && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => updateStatus(e, "IN_PROGRESS")}
                                                >
                                                    Start
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() => updateStatus(e, "RESOLVED")}
                                                >
                                                    Resolve
                                                </button>
                                            </>
                                        )}

                                        <Link
                                            to={`/ExceptionEvent/deleteExceptionEvent/${e.exceptionId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>

                                        <Link
                                            to={`/ExceptionEvent/updateExceptionEvent/${e.exceptionId}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Exception Events Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
