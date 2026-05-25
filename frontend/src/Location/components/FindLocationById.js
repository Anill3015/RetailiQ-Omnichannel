import axios from 'axios';
import { useState } from 'react';

export default function FindLocationById() {
    const [locationId, setLocationId] = useState("");
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        if (!locationId) {
            alert("Please enter a Location ID");
            return;
        }

        axios.get(`http://localhost:9011/api/location/find/${locationId}`)
            .then((response) => {
                setLocation(response.data);
                setError("");
            })
            .catch(() => {
                setLocation(null);
                setError("Location not found with ID: " + locationId);
            });
    };

    return (
        <div>
            <h2>Find Location By ID</h2>

            <label>Location ID</label>
            <input
                type="number"
                placeholder="Enter Location ID"
                onChange={(e) => setLocationId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {location && (
                <table border="1">
                    <tbody>
                        <tr><th>Location ID</th><td>{location.locationId}</td></tr>
                        <tr><th>Name</th><td>{location.name}</td></tr>
                        <tr><th>Type</th><td>{location.type}</td></tr>
                        <tr><th>Region</th><td>{location.region}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}