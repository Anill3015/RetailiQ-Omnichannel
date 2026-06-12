import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindIntegrationEndpoint() {

    const [endpointList, setEndpointList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/fetchAllIntegrationEndpoints", {
            headers: { Authorization: `Bearer ${token}` }
        })
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

    // Pagination
    const totalPages = Math.ceil(endpointList.length / itemsPerPage);
    const currentItems = endpointList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

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
                        {currentItems.length > 0 ? (
                            currentItems.map((e) => (
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

            {endpointList.length > 0 && (
                <div className="d-flex align-items-center gap-2 mt-3">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        style={{
                            padding: "7px 18px",
                            borderRadius: "6px",
                            border: "2px solid #3a85c7",
                            backgroundColor: "#ffffff",
                            color: currentPage === 1 ? "#3a85c7" : "#1a6ab5",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                            opacity: currentPage === 1 ? 0.5 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: "14px", color: "#333", fontWeight: "500", padding: "0 4px" }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: "7px 18px",
                            borderRadius: "6px",
                            border: "2px solid #3a85c7",
                            backgroundColor: "#ffffff",
                            color: currentPage === totalPages ? "#3a85c7" : "#1a6ab5",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}