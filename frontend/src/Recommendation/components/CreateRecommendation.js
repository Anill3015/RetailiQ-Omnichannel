import axios from 'axios';
import { useState } from 'react';

export default function CreateRecommendation() {
    const [customerId, setCustomerId] = useState("");
    const [skuList, setSkuList] = useState("");

    const customerIdHandler = (e) => setCustomerId(e.target.value);
    const skuListHandler = (e) => setSkuList(e.target.value);

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
            <h2>Create Recommendation</h2>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input className="form-control" type="number" value={customerId} onChange={customerIdHandler} placeholder="Enter Customer ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">SKU List (comma separated)</label>
                <input className="form-control" value={skuList} onChange={skuListHandler} placeholder="SKU001, SKU002" />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    );
}