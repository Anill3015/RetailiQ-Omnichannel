import axios from 'axios';
import { useState } from 'react';

export default function CreateReplenishment() {
    const [sku, setSku] = useState("");
    const [fromLocationId, setFromLocationId] = useState("");
    const [toLocationId, setToLocationId] = useState("");
    const [quantity, setQuantity] = useState("");

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
            const msg = error.response?.data?.message
                     || error.response?.data
                     || error.message;
            alert("Error: " + msg);
        });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Create Replenishment Order</h2>

            <div className="mb-4">
                <label className="form-label">Product SKU</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter existing product SKU"
                    onChange={(e) => setSku(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">From Location ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter existing location ID"
                    onChange={(e) => setFromLocationId(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">To Location ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter existing location ID"
                    onChange={(e) => setToLocationId(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={saveHandler}>
                SAVE
            </button>
        </div>
    );
}