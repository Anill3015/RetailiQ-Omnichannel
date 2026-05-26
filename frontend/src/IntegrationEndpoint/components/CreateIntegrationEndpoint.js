import axios from "axios";
import { useState } from "react";

export default function CreateIntegrationEndpoint() {

    const [name, setName] = useState("");
    const [type, setType] = useState("POS");
    const [config, setConfig] = useState("");
    const [active, setActive] = useState(false);  // ✅ boolean, matches entity

    const saveHandler = () => {

        let url = "http://localhost:9011/api/addIntegrationEndpoint";

        let data = {
            integrationEndpoint: {
                // ✅ endpointId removed — @GeneratedValue, DB sets it automatically
                name: name,
                type: type,
                config: config,
                active: active   // ✅ boolean, matches entity field
            }
        };

        axios.post(url, data)
            .then((response) => {
                alert("Integration Endpoint added successfully!");
            })
            .catch((error) => {
                console.error(error);
                alert("Error: " + error.message);
            });
    };

    return (
        <div>
            <h2>Create Integration Endpoint</h2>

            <label>Name</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />

            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                {/* ✅ matches entity Type options from project doc: POS/ERP/WMS/Carrier */}
                <option value="POS">POS</option>
                <option value="ERP">ERP</option>
                <option value="WMS">WMS</option>
                <option value="Carrier">Carrier</option>
            </select>
            <br />

            <label>Config</label>
            <input
                value={config}
                onChange={(e) => setConfig(e.target.value)}
            />
            <br />

            <label>Active</label>
            <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}  // ✅ gives true/false
            />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}