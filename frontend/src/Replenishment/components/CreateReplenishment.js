import axios from 'axios';
import { useState } from 'react';

export default function CreateReplenishment() {
    const [sku, setSku] = useState("");
    const [fromLocationId, setFromLocationId] = useState("");
    const [toLocationId, setToLocationId] = useState("");
    const [quantity, setQuantity] = useState("");

    const skuHandler = (e) => setSku(e.target.value);
    const fromLocationIdHandler = (e) => setFromLocationId(e.target.value);
    const toLocationIdHandler = (e) => setToLocationId(e.target.value);
    const quantityHandler = (e) => setQuantity(e.target.value);

    const saveHandler = () => {
        if (!sku || !fromLocationId || !toLocationId || !quantity) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/replenishment/add";
        const data = {
            replenishmentOrder: {
                product: { sku: sku },
                fromLocation: { locationId: parseInt(fromLocationId) },
                toLocation: { locationId: parseInt(toLocationId) },
                quantity: parseInt(quantity)
            }
        };

        axios.post(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Replenishment Order Created! " + response.data.message);
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
            <h2>Create Replenishment Order</h2>

            <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input className="form-control" value={sku} onChange={skuHandler} placeholder="Enter existing product SKU" />
            </div>

            <div className="mb-3">
                <label className="form-label">From Location ID</label>
                <input className="form-control" type="number" value={fromLocationId} onChange={fromLocationIdHandler} placeholder="Enter existing location ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">To Location ID</label>
                <input className="form-control" type="number" value={toLocationId} onChange={toLocationIdHandler} placeholder="Enter existing location ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input className="form-control" type="number" value={quantity} onChange={quantityHandler} placeholder="Enter quantity" />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    );
}