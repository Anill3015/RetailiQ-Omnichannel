import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
    const [customerID, setCustomerID] = useState("");
    const [channel, setChannel] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const navigate = useNavigate();

    const saveHandler = (event) => {
        event.preventDefault();

        if (!customerID || !channel || !totalAmount) {
            alert("All fields are required");
            return;
        }

        const data = {
            customerID: parseInt(customerID),
            channel: channel,
            totalAmount: parseFloat(totalAmount)
        };

        axios.post("http://localhost:9011/orders/add", data)
            .then((response) => {
                alert("Order Created! Order ID: " + response.data.orderID);
                setCustomerID("");
                setChannel("");
                setTotalAmount("");
                navigate("/Order/findOrder");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error: " + error.response.status + " - " + JSON.stringify(error.response.data));
                } else {
                    alert("Network error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Create Order</h2>
            <form onSubmit={saveHandler}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="enter customer ID"
                        value={customerID}
                        onChange={(e) => setCustomerID(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Channel</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ONLINE, STORE"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="enter total amount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}