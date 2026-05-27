import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteReplenishment() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`http://localhost:9011/api/replenishment/delete/${rid}`)
            .then((response) => {
                alert(response.data);
                navigate("/Replenishment/findReplenishment");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Delete Replenishment Order</h2>
            <p>Are you sure you want to delete Order ID: <strong>{rid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Replenishment/findReplenishment")}>Cancel</button>
        </div>
    );
}