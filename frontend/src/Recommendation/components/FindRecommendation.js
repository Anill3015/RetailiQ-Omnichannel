import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindRecommendation() {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:9011/api/recommendation/fetchAll")
            .then((response) => {
                setRecommendations(response.data);
                setError("");
                setLoading(false);
            })
            .catch((error) => {
                setError("Error: " + (error.response?.data?.message || error.message));
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>All Recommendations</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && recommendations.length === 0 && !error && (
                <p>No recommendations found.</p>
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