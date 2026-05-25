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
            alert("Error: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <h2>Create Replenishment Order</h2>

            <label>Product SKU</label>
            <input type="text" placeholder="e.g. SKU001" onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>From Location ID</label>
            <input type="number" onChange={(e) => setFromLocationId(e.target.value)} />
            <br />

            <label>To Location ID</label>
            <input type="number" onChange={(e) => setToLocationId(e.target.value)} />
            <br />

            <label>Quantity</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}