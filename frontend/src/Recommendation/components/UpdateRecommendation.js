import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateRecommendation() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const [customerId, setCustomerId] = useState("");
    const [skuList, setSkuList] = useState("");

    useEffect(() => {
        if (!rid) return;

        // ✅ Fetch by rec ID directly
        axios.get(`http://localhost:9011/api/recommendation/find/${rid}`)
            .then((response) => {
                const r = response.data;
                setCustomerId(r.customer?.customerId || "");
                setSkuList(r.skuList?.join(", ") || "");
            })
            .catch((error) => {
                console.error("Fetch Error:", error);
                alert("Error fetching recommendation: " + (error.response?.data?.message || error.message));
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
                recId: parseInt(rid),  // ✅ correct rec ID from URL
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
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
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
        </div>
    );
}