import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeletePriceList() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:9011/pricelist/delete/${id}`)
            .then((res) => {
                alert(res.data);
                navigate("/PriceList/findPriceList");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
                navigate("/PriceList/findPriceList");
            });
    }, [id]);

    return (
        <div>
            <h2>Deleting PriceList...</h2>
        </div>
    );
}