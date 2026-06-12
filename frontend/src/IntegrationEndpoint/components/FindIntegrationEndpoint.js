import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindIntegrationEndpoint() {

    const [endpointList, setEndpointList] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:9011/api/fetchAllIntegrationEndpoints")
            .then((response) => {
                setEndpointList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Failed to load integration endpoints");
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Integration Endpoints List</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
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
                        {endpointList.length > 0 ? (
                            endpointList.map((e) => (
                                <tr key={e.endpointId}>
                                    <td>{e.endpointId}</td>
                                    <td>{e.name}</td>
                                    <td>{e.type}</td>
                                    <td>{e.config}</td>
                                    <td>{e.active ? "Yes" : "No"}</td>

                                    <td>
                                        <Link
                                            to={`/IntegrationEndpoint/deleteIntegrationEndpoint/${e.endpointId}`}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </Link>
                                        <Link
                                            to={`/IntegrationEndpoint/updateIntegrationEndpoint/${e.endpointId}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Integration Endpoints Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}