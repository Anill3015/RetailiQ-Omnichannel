import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteIntegrationEndpoint() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    useEffect(() => {

        const confirmDelete = window.confirm("Are you sure you want to delete this Integration Endpoint?");

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteIntegrationEndpoint/${id}`)
                .then(() => {
                    setStatus("Integration Endpoint deleted successfully");
                    setTimeout(() => {
                        navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
                    }, 1000);
                })
                .catch((error) => {
                    if (error.response) {
                        setStatus("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                    } else if (error.request) {
                        setStatus("No response from server. Make sure the backend is running on port 9011.");
                    } else {
                        setStatus("Error: " + error.message);
                    }
                });

        } else {
            navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
        }

    }, [id, navigate]);

    return (
        <div className="container mt-4">
            <h2>Delete Integration Endpoint</h2>

            {status && (
                <div className={`alert ${status.includes("successfully") ? "alert-success" : "alert-danger"} mt-3`}>
                    {/* ✅ green alert for success, red alert for error */}
                    {status}
                </div>
            )}
        </div>
    );
}