import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function DeleteOrder() {
    const { oid } = useParams();
    const navigate = useNavigate();

    const deleteHandler = () => {
        axios.delete(`http://localhost:9011/orders/${oid}`)
            .then(() => {
                alert("Order Deleted Successfully!");
                navigate("/Order/findOrder");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Delete Order</h2>
            <p>Are you sure you want to delete Order ID: <strong>{oid}</strong>?</p>
            <button onClick={deleteHandler}>DELETE</button>
            <button onClick={() => navigate("/Order/findOrder")}>Cancel</button>
        </div>
    );
}