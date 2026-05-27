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
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Create Recommendation</h2>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Customer ID"
                    onChange={(e) => setCustomerId(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">SKU List (comma separated)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="SKU001, SKU002"
                    onChange={(e) => setSkuList(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={saveHandler}>
                SAVE
            </button>
        </div>
    );
}