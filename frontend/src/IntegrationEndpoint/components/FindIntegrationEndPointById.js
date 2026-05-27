import axios from "axios";
import { useState } from "react";

export default function FindIntegrationEndpointById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter an Endpoint ID");
            return;
        }

        axios.get(`http://localhost:9011/api/findIntegrationEndpoint/${id}`)
            .then((response) => {
                setData(response.data);
                setError("");
            })
            .catch((error) => {
                setData(null);
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Find Integration Endpoint By ID</h2>

            <div className="mb-3">
                <label className="form-label">Endpoint ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Endpoint ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>Search</button>

            {/* ✅ error alert — red, same as CustomerProfile reference */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* ✅ result table — same style as CustomerProfile reference */}
            {data && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Endpoint ID</th><td>{data.endpointId}</td></tr>
                        <tr><th>Name</th>      <td>{data.name}</td></tr>
                        <tr><th>Type</th>      <td>{data.type}</td></tr>
                        <tr><th>Config</th>    <td>{data.config}</td></tr>
                        <tr><th>Active</th>    <td>{data.active ? "Yes" : "No"}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}