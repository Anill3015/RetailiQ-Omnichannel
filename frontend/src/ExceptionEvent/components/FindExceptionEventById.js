import axios from "axios";
import { useState } from "react";

export default function FindExceptionEventById() {

    const [id, setId] = useState("");
    const [event, setEvent] = useState(null);
<<<<<<< HEAD

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const handleSearch = () => {

        axios.get(`http://localhost:9011/api/findExceptionEvent/${id}`)
            .then((response) => {

                let e = response.data.exceptionEvent;   // ✅ IMPORTANT

                setEvent(e);
            })
            .catch((err) => {
                console.error(err);
                alert("Record not found ❌");
                setEvent(null);
            });
    };

    return (
        <div>
            <h2>Find Exception Event By ID</h2>

            <label>Enter ID:</label>
            <input value={id} onChange={handleChange} />

            <button onClick={handleSearch}>Search</button>

            <br /><br />

            {event && (
                <table border="1">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{event.exceptionId}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{event.type}</td>
                        </tr>
                        <tr>
                            <td>Reference ID</td>
                            <td>{event.referenceId}</td>
                        </tr>
                        <tr>
                            <td>Severity</td>
                            <td>{event.severity}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{event.status}</td>
                        </tr>
                        <tr>
                            <td>Detected Date</td>
=======
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = () => {

        setErrorMsg("");
        setEvent(null);

        // ✅ Validation
        if (!id) {
            setErrorMsg("⚠️ Please enter Exception Event ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findExceptionEvent/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const e = response.data.exceptionEvent;
            setEvent(e);
        })
        .catch((err) => {
            console.error(err);
            setEvent(null);

            // ✅ Proper backend error handling
            if (err.response && err.response.data) {
                if (err.response.data.message) {
                    setErrorMsg(err.response.data.message);
                } else if (typeof err.response.data === "string") {
                    setErrorMsg(err.response.data);
                } else {
                    setErrorMsg("Record not found");
                }
            } else {
                setErrorMsg("Record not found");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Exception Event By ID</h2>

            {/* ✅ Error Message */}
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
                    placeholder="Enter Exception ID"
                />
                {!id && errorMsg && (
                    <small className="text-danger">
                        Exception Event ID is required
                    </small>
                )}
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {/* ✅ Result Table */}
            {event && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{event.exceptionId}</td>
                        </tr>

                        <tr>
                            <th>Type</th>
                            <td>{event.type}</td>
                        </tr>

                        <tr>
                            <th>Reference ID</th>
                            <td>{event.referenceId}</td>
                        </tr>

                        <tr>
                            <th>Severity</th>
                            <td>{event.severity}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{event.status}</td>
                        </tr>

                        <tr>
                            <th>Detected Date</th>
>>>>>>> Rakesh
                            <td>{event.detectedDate}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}