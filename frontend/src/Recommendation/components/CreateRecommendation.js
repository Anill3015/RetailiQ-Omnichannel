import axios from 'axios';
import { useState } from 'react';

export default function CreateRecommendation() {
    const [customerId, setCustomerId] = useState("");
    const [skuList, setSkuList] = useState("");

    const saveHandler = () => {
        if (!customerId) {
            alert("Customer ID is required");
            return;
        }

        const url = "http://localhost:9011/api/recommendation/add";
        const data = {
            recommendation: {
                customer: {
                    customerId: parseInt(customerId)
                },
                skuList: skuList.split(",").map(s => s.trim())
            }
        };

        axios.post(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Recommendation Saved! " + response.data.message);
        })
        .catch((error) => {
            alert("Error: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <h2>Create Recommendation</h2>

            <label>Customer ID</label>
            <input type="number" onChange={(e) => setCustomerId(e.target.value)} />
            <br />

            <label>SKU List (comma separated)</label>
            <input type="text" placeholder="SKU001, SKU002" onChange={(e) => setSkuList(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}