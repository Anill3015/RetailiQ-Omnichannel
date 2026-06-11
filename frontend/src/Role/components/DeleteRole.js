import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteRole() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.delete(`http://localhost:9011/role/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => {
                alert(res.data);
                navigate("/Role/findAllRole");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/Role/findAllRole");
            });
    }, [id]);

    return (
        <div className="container mt-4">
            <div className="alert alert-warning">Deleting Role...</div>
        </div>
    );
}