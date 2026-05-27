import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:9011/user/delete/${id}`)
            .then((res) => {
                alert(res.data);
                navigate("/User/findUser");  // ✅ fixed
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/User/findUser");  // ✅ fixed
            });
    }, [id]);

    return (
        <div>
            <h2>Deleting User...</h2>
        </div>
    );
}