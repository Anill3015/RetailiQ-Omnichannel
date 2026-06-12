import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9011/orders/getAll?page=0&size=100")
            .then((response) => {
                const data = response.data.content || response.data;
                setOrders(data);
                console.log(data);  // FIXED: log data directly, not orders (state not updated yet)
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Orders</h2>
            <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Channel</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>sku</th>
                        <th>quantity</th>
                        <th>Destination</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.orderID}>
                            <td>{o.orderID}</td>
                            <td>{o.customerID}</td>
                            <td>{o.channel}</td>
                            <td>{o.orderDate}</td>
                            <td>{o.status}</td>
                            <td>{o.totalAmount}</td>
                            <td>{o.sku}</td>
                            <td>{o.quantity}</td>
                            <td>{o.destination}</td>
                            <td>
                                <Link to={`/Order/updateOrder/${o.orderID}`} className="btn btn-danger btn-sm me-2">Edit</Link>
                                {" | "}
                                <Link to={`/Order/deleteOrder/${o.orderID}`} className="btn btn-warning btn-sm">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        
    );
}