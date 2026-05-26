import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateIntegrationEndpoint() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("POS");
    const [config, setConfig] = useState("");
    const [active, setActive] = useState(false);  // ✅ boolean, matches entity

    // ✅ LOAD EXISTING DATA
    useEffect(() => {
        axios.get(`http://localhost:9011/api/findIntegrationEndpoint/${id}`)
            .then((response) => {
                let e = response.data;  // ✅ controller returns IntegrationEndpoint directly (no wrapper)

                setName(e.name);
                setType(e.type);
                setConfig(e.config);
                setActive(e.active);  // ✅ boolean loaded directly into checkbox
            })
            .catch((error) => {
                console.error(error);
                alert("Error loading Integration Endpoint");
            });
    }, [id]);

    // ✅ UPDATE FUNCTION
    const handleUpdate = () => {

        let url = "http://localhost:9011/api/updateIntegrationEndpoint";

        let data = {
            integrationEndpoint: {
                endpointId: parseInt(id),  // ✅ needed so backend knows which record to update
                name: name,
                type: type,
                config: config,
                active: active             // ✅ boolean, matches entity
            }
        };

        axios.post(url, data)
            .then(() => {
                alert("Integration Endpoint updated successfully");
                navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");  // ✅ redirect to list
            })
            .catch((error) => {
                console.error(error);
                alert("Update failed: " + error.message);
            });
    };

    return (
        <div>
            <h2>Update Integration Endpoint</h2>

            <label>ID</label>
            <input value={id} readOnly />
            <br />

            <label>Name</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />

            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
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

            <button onClick={handleUpdate}>UPDATE</button>
        </div>
    );
}