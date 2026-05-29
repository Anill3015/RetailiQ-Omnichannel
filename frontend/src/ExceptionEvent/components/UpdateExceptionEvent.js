import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateExceptionEvent() {

    let { id } = useParams();
    let navigate = useNavigate();

    let [type, setType] = useState("");
    let [referenceId, setReferenceId] = useState("");
    let [severity, setSeverity] = useState("");
    let [status, setStatus] = useState("");

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        const token = localStorage.getItem("token");

    axios.get(`http://localhost:9011/api/findExceptionEvent/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
    })
        .then((response) => {

            // ✅ FIX HERE
            let e = response.data.exceptionEvent;

            setType(e.type);
            setReferenceId(e.referenceId);
            setSeverity(e.severity);
            setStatus(e.status);
        })
        .catch((err) => {
            console.error(err);
            alert("Error loading data ❌");
        });

}, [id]);

    // ✅ UPDATE FUNCTION
    const updateHandler = () => {

        let url = `http://localhost:9011/api/updateExceptionEvent/${id}`;
        const token = localStorage.getItem("token");
        let data = {
            exceptionEvent: {
                type: type,
                referenceId: referenceId,
                severity: severity,
                status: status
            }
        };

        axios.put(url, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
    })
            .then(() => {
                alert("Updated successfully ✅");
                navigate("/ExceptionEvent/findAllExceptionEvent");
            })
            .catch((err) => {
                console.error(err);
                alert("Update failed ❌");
            });
    };

    return (
        <div>
            <h2>Edit Exception Event</h2>

            <label>ID</label>
            <input value={id} readOnly />
            <br />

            <label>TYPE</label>
            <input value={type} onChange={(e) => setType(e.target.value)} />
            <br />

            <label>REFERENCE ID</label>
            <input value={referenceId} onChange={(e) => setReferenceId(e.target.value)} />
            <br />

            <label>SEVERITY</label>
            <input value={severity} onChange={(e) => setSeverity(e.target.value)} />
            <br />

            <label>STATUS</label>
            <input value={status} onChange={(e) => setStatus(e.target.value)} />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
        </div>
    );
}