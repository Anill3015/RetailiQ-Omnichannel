import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindAllIntegrationEndpoint() {

    const [endpointList, setEndpointList] = useState([]);

    // ✅ Fetch all integration endpoints
    const fetchData = () => {
        axios.get("http://localhost:9011/api/fetchAllIntegrationEndpoints")
            .then((response) => {
                setEndpointList(response.data);  // ✅ controller returns List<IntegrationEndpoint> directly
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Failed to load integration endpoints");
            });
    };

    // ✅ Load on page start
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Integration Endpoints List</h2>

            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Endpoint ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Config</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        endpointList.length > 0 ? (
                            endpointList.map((e) => (
                                <tr key={e.endpointId}>
                                    <td>{e.endpointId}</td>
                                    <td>{e.name}</td>
                                    <td>{e.type}</td>
                                    <td>{e.config}</td>
                                    <td>{e.active ? "Yes" : "No"}</td>
                                    {/* ✅ boolean rendered as Yes/No */}

                                    <td>
                                        <Link to={`/IntegrationEndpoint/deleteIntegrationEndpoint/${e.endpointId}`}>
                                            Delete
                                        </Link>
                                        {" | "}
                                        <Link to={`/IntegrationEndpoint/updateIntegrationEndpoint/${e.endpointId}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No Integration Endpoints Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}