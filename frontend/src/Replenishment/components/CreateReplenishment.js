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
            // ✅ shows exact backend error
            const msg = error.response?.data?.message
                     || error.response?.data
                     || error.message;
            alert("Error: " + msg);
        });
    };

    return (
        <div>
            <h2>Create Replenishment Order</h2>

            <label>Product SKU</label>
            <input
                type="text"
                placeholder="Enter existing product SKU"
                onChange={(e) => setSku(e.target.value)}
            />
            <br />

            <label>From Location ID</label>
            <input type="number" placeholder="Enter existing location ID" onChange={(e) => setFromLocationId(e.target.value)} />
            <br />

            <label>To Location ID</label>
            <input type="number" placeholder="Enter existing location ID" onChange={(e) => setToLocationId(e.target.value)} />
            <br />

            <label>Quantity</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}