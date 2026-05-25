import axios from 'axios';
import { useState } from 'react';

export default function FindRecommendationById() {
    const [recId, setRecId] = useState("");
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        if (!recId) {
            alert("Please enter a Recommendation ID");
            return;
        }

        axios.get(`http://localhost:9011/api/recommendation/find/${recId}`)
            .then((response) => {
                setRecommendation(response.data);
                setError("");
            })
            .catch((error) => {
                setRecommendation(null);
                setError("Recommendation not found with ID: " + recId);
            });
    };

    return (
        <div>
            <h2>Find Recommendation By ID</h2>

            <label>Recommendation ID</label>
            <input
                type="number"
                placeholder="Enter Recommendation ID"
                onChange={(e) => setRecId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {recommendation && (
                <table border="1">
                    <tbody>
                        <tr><th>Rec ID</th><td>{recommendation.recId}</td></tr>
                        <tr><th>Customer ID</th><td>{recommendation.customer?.customerId}</td></tr>
                        <tr><th>Customer Name</th><td>{recommendation.customer?.name}</td></tr>
                        <tr><th>SKU List</th><td>{recommendation.skuList?.join(", ")}</td></tr>
                        <tr><th>Generated At</th><td>{recommendation.generatedAt}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}