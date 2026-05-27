import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteForecast() {
    const { fcid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`http://localhost:9011/api/forecast/delete/${fcid}`)
            .then((response) => {
                alert(response.data);
                navigate("/Forecast/findForecast");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Delete Forecast</h2>
            <p>Are you sure you want to delete Forecast ID: <strong>{fcid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Forecast/findForecast")}>Cancel</button>
        </div>
    );
}