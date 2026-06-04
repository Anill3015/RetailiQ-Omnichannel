import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateRecommendation() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const [customerId, setCustomerId] = useState("");
    const [skuList, setSkuList] = useState("");

<<<<<<< HEAD
    useEffect(() => {
        if (!rid) return;

        axios.get(`http://localhost:9011/api/recommendation/find/${rid}`)
=======
    const customerIdHandler = (e) => setCustomerId(e.target.value);
    const skuListHandler = (e) => setSkuList(e.target.value);

    useEffect(() => {
        if (!rid) return;
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/recommendation/find/${rid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
>>>>>>> Rakesh
            .then((response) => {
                const r = response.data;
                setCustomerId(r.customer?.customerId || "");
                setSkuList(r.skuList?.join(", ") || "");
            })
            .catch((error) => {
<<<<<<< HEAD
                console.error("Fetch Error:", error);
                alert("Error fetching recommendation: " + (error.response?.data?.message || error.message));
=======
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
>>>>>>> Rakesh
            });
    }, [rid]);

    const updateHandler = () => {
        if (!customerId) {
            alert("Customer ID is required");
            return;
        }

        const url = "http://localhost:9011/api/recommendation/update";
        const data = {
            recommendation: {
<<<<<<< HEAD
                recId: parseInt(rid),  // ✅ correct rec ID from URL
=======
                recId: parseInt(rid),
>>>>>>> Rakesh
                customer: {
                    customerId: parseInt(customerId)
                },
                skuList: skuList.split(",").map(s => s.trim())
            }
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Recommendation Updated! " + response.data.message);
            navigate("/Recommendation/findRecommendation");
        })
        .catch((error) => {
<<<<<<< HEAD
            alert("Update Failed: " + (error.response?.data?.message || error.message));
=======
            if (error.response) {
                alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
>>>>>>> Rakesh
        });
    };

    return (
<<<<<<< HEAD
        <div>
            <h2>Update Recommendation</h2>

            <label>Rec ID</label>
            <input type="text" value={rid} readOnly />
            <br />

            <label>Customer ID</label>
            <input
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />
            <br />

            <label>SKU List (comma separated)</label>
            <input
                type="text"
                value={skuList}
                onChange={(e) => setSkuList(e.target.value)}
            />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/Recommendation/findRecommendation")}>Cancel</button>
=======
        <div className="container mt-4">
            <h2>Update Recommendation</h2>

            <div className="mb-3">
                <label className="form-label">Rec ID</label>
                <input className="form-control" type="text" value={rid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input className="form-control" type="number" value={customerId} onChange={customerIdHandler} placeholder="Enter Customer ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">SKU List (comma separated)</label>
                <input className="form-control" type="text" value={skuList} onChange={skuListHandler} placeholder="SKU001, SKU002" />
            </div>

            <button className="btn btn-primary me-2" onClick={updateHandler}>Update</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Recommendation/findRecommendation")}>Cancel</button>
>>>>>>> Rakesh
        </div>
    );
}