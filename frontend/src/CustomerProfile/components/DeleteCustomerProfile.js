import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteCustomerProfile() {
    const { cpid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        const url = `http://localhost:9011/api/customer/delete/${cpid}`;
        axios.delete(url)
            .then((response) => {
                alert(response.data);
                navigate("/CustomerProfile/findCustomerProfile");
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <div>
            <h2>Delete Customer Profile</h2>
            <p>Are you sure you want to delete Customer ID: <strong>{cpid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/CustomerProfile/findCustomerProfile")}>Cancel</button>
        </div>
    );
}