import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
    const { id } = useParams();
    const navigate = useNavigate();
   
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:9011/user/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
    })
            .then((res) => {
                alert(res.data);
                navigate("/User/findAllUser");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/User/findAllUser");
            });
    }, [id]);

    return (
        <div className="container mt-4">
            <div className="alert alert-warning">Deleting User...</div>
        </div>
    );
}