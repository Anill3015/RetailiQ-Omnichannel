<<<<<<< HEAD
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
=======
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteIntegrationEndpoint() {
    const { eid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        const token = localStorage.getItem("token");

        // ✅ Path variable delete
        axios.delete(`http://localhost:9011/api/deleteIntegrationEndpoint/${eid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            alert(response.data);
            navigate("/IntegrationEndpoint/findAllIntegrationEndpoint");
        })
        .catch((error) => {
            if (error.response) {
                alert("Error " + error.response.status + ": " + JSON.stringify(error.response.data));
            } else if (error.request) {
                alert("No response from server.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };
>>>>>>> Rakesh

    return (
        <div className="container mt-4">
            <h2>Delete Integration Endpoint</h2>
<<<<<<< HEAD

            {status && (
                <div className={`alert ${status.includes("successfully") ? "alert-success" : "alert-danger"} mt-3`}>
                    {/* ✅ green alert for success, red alert for error */}
                    {status}
                </div>
            )}
=======
            <p>Are you sure you want to delete Endpoint ID: <strong>{eid}</strong>?</p>
            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary"
                onClick={() => navigate("/IntegrationEndpoint/findAllIntegrationEndpoint")}>
                Cancel
            </button>
>>>>>>> Rakesh
        </div>
    );
}