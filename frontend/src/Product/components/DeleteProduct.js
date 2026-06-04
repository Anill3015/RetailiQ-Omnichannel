import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        axios.delete(`http://localhost:9011/product/delete/${id}`)
=======
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:9011/product/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
>>>>>>> Rakesh
            .then((res) => {
                alert(res.data);
                navigate("/Product/findProduct");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/Product/findProduct");
            });
    }, [id]);

    return (
<<<<<<< HEAD
        <div>
            <h2>Deleting Product...</h2>
=======
        <div className="container mt-4">
            <div className="alert alert-warning">Deleting Product...</div>
>>>>>>> Rakesh
        </div>
    );
}