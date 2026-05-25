import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteRecommendation() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`http://localhost:9011/api/recommendation/delete/${rid}`)
            .then((response) => {
                alert(response.data);
                navigate("/Recommendation/findRecommendation");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Delete Recommendation</h2>
            <p>Are you sure you want to delete Recommendation ID: <strong>{rid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Recommendation/findRecommendation")}>Cancel</button>
        </div>
    );
}