import axios from "axios";
import { useState } from "react";

export default function AddExceptionEvent() {

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