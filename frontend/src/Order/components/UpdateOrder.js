import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateOrder() {
    const { oid } = useParams();
    const navigate = useNavigate();

    const [customerID, setCustomerID] = useState("");
    const [channel, setChannel] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!oid) return;
        axios.get(`http://localhost:9011/orders/${oid}`)
            .then((response) => {
                const o = response.data;
                setCustomerID(o.customerID || "");
                setChannel(o.channel || "");
                setTotalAmount(o.totalAmount || "");
                setStatus(o.status || "");
            })
            .catch((error) => {
                alert("Error fetching order: " + (error.response?.data?.message || error.message));
            });
    }, [oid]);

    const updateHandler = () => {
        if (!customerID || !channel || !totalAmount) {
            alert("All fields are required");
            return;
        }

        const url = `http://localhost:9011/orders/${oid}`;
        const data = {
            customerID: parseInt(customerID),
            channel: channel,
            totalAmount: parseInt(totalAmount)
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Order Updated! Order ID: " + response.data.orderID);
            navigate("/Order/findOrder");
        })
        .catch((error) => {
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Order</h2>
<div className="mb-3">
            <label>Order ID</label>
            <input type="text" value={oid} readOnly />
            <br />
            </div>
<div className="mb-3">
            <label>Customer ID</label>
            <input type="number" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label>Channel</label>
            <input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label>Total Amount</label>
            <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            <br />
            </div>
<div className="mb-3">
            <label>Status</label>
            <input type="text" value={status} readOnly />
            <br />
            </div>

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/Order/findOrder")}>Cancel</button>
        </div>
    );
}