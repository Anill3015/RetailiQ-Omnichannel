import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router';

export default function FindRecommendation() {
    const [customerId, setCustomerId] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [searched, setSearched] = useState(false);

    const searchHandler = () => {
        if (!customerId) {
            alert("Please enter a Customer ID");
            return;
        }

        axios.get(`http://localhost:9011/api/recommendation/customer/${customerId}`)
            .then((response) => {
                setRecommendations(response.data);
                setSearched(true);
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Find Recommendations by Customer</h2>

            <label>Customer ID</label>
            <input
                type="number"
                placeholder="Enter Customer ID"
                onChange={(e) => setCustomerId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {searched && recommendations.length === 0 && (
                <p style={{ color: "red" }}>No recommendations found.</p>
            )}

            {recommendations.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Rec ID</th>
                            <th>Customer ID</th>
                            <th>SKU List</th>
                            <th>Generated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((r) => (
                            <tr key={r.recId}>
                                <td>{r.recId}</td>
                                <td>{r.customer?.customerId}</td>
                                <td>{r.skuList?.join(", ")}</td>
                                <td>{r.generatedAt}</td>
                                <td>
                                    {/* ✅ Absolute paths */}
                                    <Link to={`/Recommendation/updateRecommendation/${r.recId}`}>Edit</Link>
                                    {" | "}
                                    <Link to={`/Recommendation/deleteRecommendation/${r.recId}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}