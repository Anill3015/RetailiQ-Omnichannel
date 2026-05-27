import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindLocation() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9011/api/location/fetchAll")
            .then((response) => {
                setLocations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    return (
        <div>
            <h2>All Locations</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Location ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((l) => (
                        <tr key={l.locationId}>
                            <td>{l.locationId}</td>
                            <td>{l.name}</td>
                            <td>{l.type}</td>
                            <td>{l.region}</td>
                            <td>
                                <Link to={`/Location/updateLocation/${l.locationId}`}>Edit</Link>
                                {" | "}
                                <Link to={`/Location/deleteLocation/${l.locationId}`}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}