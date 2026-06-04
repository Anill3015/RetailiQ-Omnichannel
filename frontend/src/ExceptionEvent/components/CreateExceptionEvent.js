import axios from "axios";
import { useState } from "react";

export default function AddExceptionEvent() {

<<<<<<< HEAD
    let [type, setType] = useState("");
    let [referenceId, setReferenceId] = useState("");
    let [severity, setSeverity] = useState("");
    let [status, setStatus] = useState("");

    let typeHandler = (event) => {
        setType(event.target.value);
    }

    let referenceHandler = (event) => {
        setReferenceId(event.target.value);
    }

    let severityHandler = (event) => {
        setSeverity(event.target.value);
    }

    let statusHandler = (event) => {
        setStatus(event.target.value);
    }

    let saveHandler = () => {

        let url = "http://localhost:9011/api/addExceptionEvent";

        let data = {
            "exceptionEvent": {
                "type": type,
                "referenceId": referenceId,
                "severity": severity,
                "status": status
            }
        };

        axios.post(url, data).then((response) => {
            alert("Exception Event added successfully");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
            alert("Error adding exception event");
        });
    }

    return (
        <div>

            <label>TYPE</label>
            <input value={type} onChange={typeHandler}></input>
            <br></br>

            <label>REFERENCE ID</label>
            <input value={referenceId} onChange={referenceHandler}></input>
            <br></br>

            <label>SEVERITY</label>
            <input value={severity} onChange={severityHandler}></input>
            <br></br>

            <label>STATUS</label>
            <input value={status} onChange={statusHandler}></input>
            <br></br>

            <button onClick={saveHandler}>SAVE</button>

        </div>
    );
}
=======
    const [type, setType] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const saveHandler = () => {

        if (!type || !referenceId || !severity || !status) {
            setErrorMsg("⚠️ Please fill all fields");
            return;
        }

        setErrorMsg("");

        const url = "http://localhost:9011/api/addExceptionEvent";
        const token = localStorage.getItem("token");

        const data = {
            exceptionEvent: {
                type,
                referenceId,
                severity,
                status
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("Exception Event added successfully");

            setType("");
            setReferenceId("");
            setSeverity("");
            setStatus("");
        })
        .catch((error) => {
            console.error(error);
            setErrorMsg("Error adding exception event");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Add Exception Event</h2>

            {/* ✅ Global error */}
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter type"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Reference ID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    className="form-control"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Enter reference ID"
                />
                {!referenceId && errorMsg && (
                    <small className="text-danger">Reference ID is mandatory</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Severity</label>
                <input
                    className="form-control"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    placeholder="Enter severity"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
                />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>
                Save
            </button>
        </div>
    );
}
>>>>>>> Rakesh
