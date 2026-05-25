import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllExceptionEvent() {

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
    useEffect(() => {
        fetchData();
    }, []);

    return (
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
        </div>
    );
}
