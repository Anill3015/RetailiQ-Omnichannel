import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteCustomerProfile() {
    const { cpid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        const url = `http://localhost:9011/api/customer/delete/${cpid}`;
        const token = localStorage.getItem("token");
        axios.delete(url, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                alert(response.data);
                navigate("/CustomerProfile/findCustomerProfile");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Delete Customer Profile</h2>

            <p>Are you sure you want to delete Customer ID: <strong>{cpid}</strong>?</p>

            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate("/CustomerProfile/findCustomerProfile")}>Cancel</button>
        </div>
    );
}