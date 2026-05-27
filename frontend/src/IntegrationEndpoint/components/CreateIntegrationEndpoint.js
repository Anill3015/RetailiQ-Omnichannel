import axios from "axios";
import { useState } from "react";

export default function CreateIntegrationEndpoint() {

    const [name, setName] = useState("");
    const [type, setType] = useState("POS");
    const [config, setConfig] = useState("");
    const [active, setActive] = useState(false);

    const saveHandler = () => {
        const url = "http://localhost:9011/api/addIntegrationEndpoint";
        const data = {
            integrationEndpoint: { name, type, config, active }
        };

        axios.post(url, data)
            .then((response) => {
                alert("Integration Endpoint added successfully!");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create Integration Endpoint</h2>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter endpoint name"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="POS">POS</option>
                    <option value="ERP">ERP</option>
                    <option value="WMS">WMS</option>
                    <option value="Carrier">Carrier</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Config</label>
                <input
                    className="form-control"
                    value={config}
                    onChange={(e) => setConfig(e.target.value)}
                    placeholder="Enter config details"
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    id="activeCheck"
                />
                <label className="form-check-label" htmlFor="activeCheck">
                    Active
                </label>
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>SAVE</button>
        </div>
    );
}