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
        <div className="container mt-4">
            <h2 className="mb-3">All Recommendations</h2>

            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && recommendations.length === 0 && !error && (
                <div className="alert alert-info">No recommendations found.</div>
            )}

            {recommendations.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
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
                                        <Link
                                            to={`/Recommendation/updateRecommendation/${r.recId}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/Recommendation/deleteRecommendation/${r.recId}`}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}