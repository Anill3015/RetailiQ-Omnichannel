import axios from "axios";
import { useState } from "react";

export default function FindIntegrationEndpointById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);

    const handleSearch = () => {

        if (!id) {
            alert("Please enter ID");
            return;
        }

        axios.get(`http://localhost:9011/api/findIntegrationEndpoint/${id}`)
            .then((response) => {
                setData(response.data);  // ✅ controller returns IntegrationEndpoint directly (no wrapper)
            })
            .catch((error) => {
                console.error(error);
                alert("Integration Endpoint not found");
                setData(null);
            });
    };

    return (
        <div>
            <h2>Find Integration Endpoint By ID</h2>

            <div>
                <label>Enter Endpoint ID: </label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <br />

            {data && (
                <table border="1" cellPadding="6">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Endpoint ID</td>
                            <td>{data.endpointId}</td>
                        </tr>

                        <tr>
                            <td>Name</td>
                            <td>{data.name}</td>
                        </tr>

                        <tr>
                            <td>Type</td>
                            <td>{data.type}</td>
                        </tr>

                        <tr>
                            <td>Config</td>
                            <td>{data.config}</td>
                        </tr>

                        <tr>
                            <td>Active</td>
                            <td>{data.active ? "Yes" : "No"}</td>
                            {/* ✅ boolean → readable text */}
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}