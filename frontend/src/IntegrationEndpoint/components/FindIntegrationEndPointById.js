import axios from "axios";
import { useState } from "react";

export default function FindIntegrationEndpointById() {

    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {
<<<<<<< HEAD

=======
>>>>>>> Rakesh
        if (!id) {
            alert("Please enter an Endpoint ID");
            return;
        }

<<<<<<< HEAD
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
=======
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/findIntegrationEndpoint/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            setData(response.data);
            setError("");
        })
        .catch((error) => {
            setData(null);
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 404) {
                    // ✅ Clean user-friendly message
                    setError("Integration Endpoint not found with ID: " + id + " ❌");
                } else {
                    setError("Something went wrong ❌");
                }
            } else if (error.request) {
                setError("No response from server. Make sure the backend is running on port 9011.");
            } else {
                setError("Error: " + error.message);
            }
        });
>>>>>>> Rakesh
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

<<<<<<< HEAD
            {/* ✅ error alert — red, same as CustomerProfile reference */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* ✅ result table — same style as CustomerProfile reference */}
=======
            {/* ✅ Clean error message */}
            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}

>>>>>>> Rakesh
            {data && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Endpoint ID</th><td>{data.endpointId}</td></tr>
<<<<<<< HEAD
                        <tr><th>Name</th>      <td>{data.name}</td></tr>
                        <tr><th>Type</th>      <td>{data.type}</td></tr>
                        <tr><th>Config</th>    <td>{data.config}</td></tr>
                        <tr><th>Active</th>    <td>{data.active ? "Yes" : "No"}</td></tr>
=======
                        <tr><th>Name</th>       <td>{data.name}</td></tr>
                        <tr><th>Type</th>       <td>{data.type}</td></tr>
                        <tr><th>Config</th>     <td>{data.config}</td></tr>
                        <tr><th>Active</th>     <td>{data.active ? "Yes" : "No"}</td></tr>
>>>>>>> Rakesh
                    </tbody>
                </table>
            )}
        </div>
    );
}