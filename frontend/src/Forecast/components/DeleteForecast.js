import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteForecast() {
    const { fcid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
<<<<<<< HEAD
        axios.delete(`http://localhost:9011/api/forecast/delete/${fcid}`)
=======
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:9011/api/forecast/delete/${fcid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        }   )
>>>>>>> Rakesh
            .then((response) => {
                alert(response.data);
                navigate("/Forecast/findForecast");
            })
            .catch((error) => {
<<<<<<< HEAD
                alert("Error: " + (error.response?.data?.message || error.message));
=======
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
>>>>>>> Rakesh
            });
    };

    return (
<<<<<<< HEAD
        <div>
            <h2>Delete Forecast</h2>
            <p>Are you sure you want to delete Forecast ID: <strong>{fcid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Forecast/findForecast")}>Cancel</button>
=======
        <div className="container mt-4">
            <h2>Delete Forecast</h2>

            <p>Are you sure you want to delete Forecast ID: <strong>{fcid}</strong>?</p>

            <button className="btn btn-danger me-2" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Forecast/findForecast")}>Cancel</button>
>>>>>>> Rakesh
        </div>
    );
}