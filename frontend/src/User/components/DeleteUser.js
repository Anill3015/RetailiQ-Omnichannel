import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
    const { id } = useParams();
    const navigate = useNavigate();
<<<<<<< HEAD

    useEffect(() => {
        axios.delete(`http://localhost:9011/user/delete/${id}`)
            .then((res) => {
                alert(res.data);
                navigate("/User/findUser");  // ✅ fixed
=======
   
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
>>>>>>> Rakesh
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
<<<<<<< HEAD
                navigate("/User/findUser");  // ✅ fixed
=======
                navigate("/User/findAllUser");
>>>>>>> Rakesh
            });
    }, [id]);

    return (
<<<<<<< HEAD
        <div>
            <h2>Deleting User...</h2>
=======
        <div className="container mt-4">
            <div className="alert alert-warning">Deleting User...</div>
>>>>>>> Rakesh
        </div>
    );
}