import axios from 'axios';
import { useState } from 'react';

export default function CreateLocation() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [region, setRegion] = useState("");

    const saveHandler = () => {
        if (!name || !type || !region) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/location/add";
        const data = {
            location: {
                name: name,
                type: type,
                region: region
            }
        };

        axios.post(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Location Created! " + response.data.message);
        })
        .catch((error) => {
            alert("Error: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mt-4">
            <h2>Create Location</h2>
            <div className="mb-3">
            <label className="form-label">Name</label>
            <input  className="form-control" type="text" placeholder="e.g. Store A" onChange={(e) => setName(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label className="form-label">Type</label>
            <input   className="form-control" type="text" placeholder="e.g. Store / DC" onChange={(e) => setType(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label className="form-label">Region</label>
            <input  className="form-control"  type="text" placeholder="e.g. North" onChange={(e) => setRegion(e.target.value)} />
            <br />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>SAVE</button>
        </div>
    );
}