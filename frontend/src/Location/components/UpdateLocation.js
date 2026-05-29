import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateLocation() {
    const { lid } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [region, setRegion] = useState("");

    useEffect(() => {
        if (!lid) return;
        axios.get(`http://localhost:9011/api/location/find/${lid}`)
            .then((response) => {
                const l = response.data;
                setName(l.name || "");
                setType(l.type || "");
                setRegion(l.region || "");
            })
            .catch((error) => {
                alert("Error fetching location: " + (error.response?.data?.message || error.message));
            });
    }, [lid]);

    const updateHandler = () => {
        if (!name || !type || !region) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/location/update";
        const data = {
            location: {
                locationId: parseInt(lid),
                name: name,
                type: type,
                region: region
            }
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Location Updated! " + response.data.message);
            navigate("/Location/findLocation");
        })
        .catch((error) => {
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Location</h2>
<div className="mb-3">
            <label>Location ID</label>
            <input type="text" value={lid} readOnly />
            <br />
            </div>
<div className="mb-3">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label>Type</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label>Region</label>
            <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
            <br />
            </div>

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/Location/findLocation")}>Cancel</button>
        </div>
    );
}