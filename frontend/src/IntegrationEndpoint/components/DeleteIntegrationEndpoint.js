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

            // ✅ matches @DeleteMapping("/deleteIntegrationEndpoint/{id}")
            axios.delete(`http://localhost:9011/api/deleteIntegrationEndpoint/${id}`)
                .then(() => {
                    setStatus("Integration Endpoint deleted successfully");

                    // ✅ redirect to list after 1 second
                    setTimeout(() => {
                        navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                    setStatus("Delete failed: " + error.message);
                });

        } else {
            // ✅ user cancelled → go back to list
            navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
        }

    }, [id, navigate]);

    return (
        <div>
            <h2>Delete Integration Endpoint</h2>
            <p>{status}</p>
        </div>
    );
}