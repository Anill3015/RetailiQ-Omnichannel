import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateReplenishment() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const [sku, setSku] = useState("");
    const [fromLocationId, setFromLocationId] = useState("");
    const [toLocationId, setToLocationId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!rid) return;
        axios.get(`http://localhost:9011/api/replenishment/find/${rid}`)
            .then((response) => {
                const o = response.data;
                setSku(o.product?.sku || "");
                setFromLocationId(o.fromLocation?.locationId || "");
                setToLocationId(o.toLocation?.locationId || "");
                setQuantity(o.quantity || "");
                setStatus(o.status || "");
            })
            .catch((error) => {
                alert("Error fetching order: " + (error.response?.data?.message || error.message));
            });
    }, [rid]);

    const updateHandler = () => {
        if (!sku || !fromLocationId || !toLocationId || !quantity) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/replenishment/update";
        const data = {
            replenishmentOrder: {
                orderId: parseInt(rid),
                product: { sku: sku },
                fromLocation: { locationId: parseInt(fromLocationId) },
                toLocation: { locationId: parseInt(toLocationId) },
                quantity: parseInt(quantity),
                status: status
            }
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Order Updated! " + response.data.message);
            navigate("/Replenishment/findReplenishment");
        })
        .catch((error) => {
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <h2>Update Replenishment Order</h2>

            <label>Order ID</label>
            <input type="text" value={rid} readOnly />
            <br />

            <label>Product SKU</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>From Location ID</label>
            <input type="number" value={fromLocationId} onChange={(e) => setFromLocationId(e.target.value)} />
            <br />

            <label>To Location ID</label>
            <input type="number" value={toLocationId} onChange={(e) => setToLocationId(e.target.value)} />
            <br />

            <label>Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <br />

            <label>Status</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/Replenishment/findReplenishment")}>Cancel</button>
        </div>
    );
}