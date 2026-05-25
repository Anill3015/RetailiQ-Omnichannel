import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteLocation() {
    const { lid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`http://localhost:9011/api/location/delete/${lid}`)
            .then((response) => {
                alert(response.data);
                navigate("/Location/findLocation");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Delete Location</h2>
            <p>Are you sure you want to delete Location ID: <strong>{lid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Location/findLocation")}>Cancel</button>
        </div>
    );
}