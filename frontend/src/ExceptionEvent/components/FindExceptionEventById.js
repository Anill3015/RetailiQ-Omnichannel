import axios from "axios";
import { useState } from "react";

export default function FindExceptionEventById() {

    const [id, setId] = useState("");
    const [event, setEvent] = useState(null);

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
                            <td>{event.detectedDate}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}