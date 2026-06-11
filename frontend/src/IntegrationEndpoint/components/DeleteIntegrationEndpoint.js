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

    return (
        <div className="container mt-4">
            <h2>Delete Integration Endpoint</h2>
            <p>Are you sure you want to delete Endpoint ID: <strong>{eid}</strong>?</p>
            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary"
                onClick={() => navigate("/IntegrationEndpoint/findAllIntegrationEndpoint")}>
                Cancel
            </button>
        </div>
    );
}