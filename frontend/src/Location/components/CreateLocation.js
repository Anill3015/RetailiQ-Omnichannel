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
        <div>
            <h2>Create Location</h2>

            <label>Name</label>
            <input type="text" placeholder="e.g. Store A" onChange={(e) => setName(e.target.value)} />
            <br />

            <label>Type</label>
            <input type="text" placeholder="e.g. Store / DC" onChange={(e) => setType(e.target.value)} />
            <br />

            <label>Region</label>
            <input type="text" placeholder="e.g. North" onChange={(e) => setRegion(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}