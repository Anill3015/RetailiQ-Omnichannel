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
        <div className="container mt-4">
            <h2 className="mb-3">Find Recommendations by Customer</h2>

            <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Customer ID"
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={searchHandler}>
                    SEARCH
                </button>
            </div>

            {searched && recommendations.length === 0 && (
                <div className="alert alert-warning">No recommendations found.</div>
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