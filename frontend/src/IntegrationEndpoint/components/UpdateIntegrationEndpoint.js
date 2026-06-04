import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateIntegrationEndpoint() {

<<<<<<< HEAD
    const { id } = useParams();
=======
    const { eid } = useParams();
>>>>>>> Rakesh
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("POS");
    const [config, setConfig] = useState("");
<<<<<<< HEAD
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
=======
    const [active, setActive] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // ✅ Added token
        axios.get(`http://localhost:9011/api/findIntegrationEndpoint/${eid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            const e = response.data;
            setName(e.name || "");
            setType(e.type || "POS");
            setConfig(e.config || "");
            setActive(e.active || false);
        })
        .catch((error) => {
            if (error.response) {
                alert("Error loading Integration Endpoint: " + error.response.status);
            } else if (error.request) {
                alert("No response from server.");
            } else {
                alert("Error loading Integration Endpoint");
            }
        });
    }, [eid]);

    const handleUpdate = () => {
        const token = localStorage.getItem("token");

        const data = {
            integrationEndpoint: {
                endpointId: parseInt(eid),
                name: name,
                type: type,
                config: config,
                active: active
            }
        };

        // ✅ Added token
        axios.post("http://localhost:9011/api/updateIntegrationEndpoint", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            alert("Integration Endpoint Updated! " + response.data.message);
            navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
        })
        .catch((error) => {
            if (error.response) {
                alert("Error " + error.response.status + ": " + JSON.stringify(error.response.data));
            } else if (error.request) {
                alert("No response from server.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Integration Endpoint</h2>

            <div className="mb-3">
                <label className="form-label">Endpoint ID</label>
                <input className="form-control" type="text" value={eid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" type="text" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            </div>

            <div className="mb-3">
                <label className="form-label">Type</label>
                <select className="form-control" value={type}
                    onChange={(e) => setType(e.target.value)}>
                    <option value="POS">POS</option>
                    <option value="ERP">ERP</option>
                    <option value="WMS">WMS</option>
                    <option value="Carrier">Carrier</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Config</label>
                <input className="form-control" type="text" value={config}
                    onChange={(e) => setConfig(e.target.value)} placeholder="Enter config" />
            </div>

            <div className="mb-3">
                <label className="form-label">Active</label>
                <select className="form-control" value={active}
                    onChange={(e) => setActive(e.target.value === "true")}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
            <button className="btn btn-secondary"
                onClick={() => navigate("/IntegrationEndpoint/findAllIntegrationEndpoint")}>
                Cancel
            </button>
>>>>>>> Rakesh
        </div>
    );
}