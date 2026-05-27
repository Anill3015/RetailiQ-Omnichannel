import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteRole() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:9011/role/delete/${id}`)
            .then((res) => {
                alert(res.data);
                navigate("/Role/findRole");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/Role/findRole");
            });
    }, [id]);

    return (
        <div>
            <h2>Deleting Role...</h2>
        </div>
    );
}