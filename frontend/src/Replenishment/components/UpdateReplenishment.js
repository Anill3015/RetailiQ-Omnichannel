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

    const skuHandler = (e) => setSku(e.target.value);
    const fromLocationIdHandler = (e) => setFromLocationId(e.target.value);
    const toLocationIdHandler = (e) => setToLocationId(e.target.value);
    const quantityHandler = (e) => setQuantity(e.target.value);
    const statusHandler = (e) => setStatus(e.target.value);

    useEffect(() => {
        if (!rid) return;
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/replenishment/find/${rid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                const o = response.data;
                setSku(o.product?.sku || "");
                setFromLocationId(o.fromLocation?.locationId || "");
                setToLocationId(o.toLocation?.locationId || "");
                setQuantity(o.quantity || "");
                setStatus(o.status || "");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    }, [rid]);

    const updateHandler = () => {
        if (!sku || !fromLocationId || !toLocationId || !quantity) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/replenishment/update";
        const token = localStorage.getItem("token");
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
        },{headers: { "Authorization": `Bearer ${token}` }})
        .then((response) => {
            alert("Order Updated! " + response.data.message);
            navigate("/Replenishment/findReplenishment");
        })
        .catch((error) => {
            if (error.response) {
                alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Replenishment Order</h2>

            <div className="mb-3">
                <label className="form-label">Order ID</label>
                <input className="form-control" type="text" value={rid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input className="form-control" type="text" value={sku} onChange={skuHandler} placeholder="Enter product SKU" />
            </div>

            <div className="mb-3">
                <label className="form-label">From Location ID</label>
                <input className="form-control" type="number" value={fromLocationId} onChange={fromLocationIdHandler} placeholder="Enter from location ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">To Location ID</label>
                <input className="form-control" type="number" value={toLocationId} onChange={toLocationIdHandler} placeholder="Enter to location ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input className="form-control" type="number" value={quantity} onChange={quantityHandler} placeholder="Enter quantity" />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <input className="form-control" type="text" value={status} onChange={statusHandler} placeholder="Enter status" />
            </div>

            <button className="btn btn-primary me-2" onClick={updateHandler}>Update</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Replenishment/findReplenishment")}>Cancel</button>
        </div>
    );
}