import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeletePromotion() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:9011/promotion/delete/${id}`)
            .then((res) => {
                alert(res.data);
                navigate("/Promotion/findPromotion");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/Promotion/findPromotion");
            });
    }, [id]);

    return (
        <div className="container mt-4">
            <div className="alert alert-warning">Deleting Promotion...</div>
        </div>
    );
}