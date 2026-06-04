import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllExceptionEvent() {

<<<<<<< HEAD
    let [eventArr, setEventData] = useState([]);

    // ✅ FETCH ALL DATA
    const fetchData = () => {
        let url = "http://localhost:9011/api/fetchAllExceptionEvents";

        axios.get(url)
            .then((response) => {
                setEventData(response.data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    // ✅ LOAD DATA ONCE
=======
    const [eventArr, setEventData] = useState([]);

    const fetchData = () => {
        const url = "http://localhost:9011/api/fetchAllExceptionEvents";
        const token = localStorage.getItem("token");

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

>>>>>>> Rakesh
    useEffect(() => {
        fetchData();
    }, []);

    return (
<<<<<<< HEAD
        <div>
            <h2>Exception Events</h2>

            <table border="1">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Type</td>
                        <td>Reference ID</td>
                        <td>Severity</td>
                        <td>Status</td>
                        <td>Detected Date</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        eventArr.map((e) => (
                            <tr key={e.exceptionId}>
                                <td>{e.exceptionId}</td>
                                <td>{e.type}</td>
                                <td>{e.referenceId}</td>
                                <td>{e.severity}</td>
                                <td>{e.status}</td>
                                <td>{e.detectedDate}</td>

                                <td>
                                    {/* ✅ ROUTE-BASED DELETE */}
                                    <Link to={`/ExceptionEvent/deleteExceptionEvent/${e.exceptionId}`}>
                                        Delete
                                    </Link>

                                    {" | "}

                                    {/* ✅ EDIT */}
                                    <Link to={`/ExceptionEvent/updateExceptionEvent/${e.exceptionId}`}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
=======
        <div className="container mt-4">
            <h2 className="mb-3">Exception Events</h2>

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
                                    <td>{e.status}</td>
                                    <td>{e.detectedDate}</td>

                                    <td>
                                        <Link
                                            to={`/ExceptionEvent/deleteExceptionEvent/${e.exceptionId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>

                                        <Link
                                            to={`/ExceptionEvent/updateExceptionEvent/${e.exceptionId}`}
                                            className="btn btn-warning btn-sm"
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
>>>>>>> Rakesh
        </div>
    );
}
