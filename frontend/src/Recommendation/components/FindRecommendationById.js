import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router';

export default function FindRecommendation() {
    const [customerId, setCustomerId] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [searched, setSearched] = useState(false);

    const customerIdHandler = (e) => setCustomerId(e.target.value);

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
            <h2>Find Recommendations by Customer</h2>

            <div className="mb-3">
                <label className="form-label">Customer ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={customerIdHandler}
                />
            </div>

            <button className="btn btn-primary" onClick={searchHandler}>Search</button>

            {searched && recommendations.length === 0 && (
                <div className="alert alert-warning mt-3">No recommendations found.</div>
            )}

            {recommendations.length > 0 && (
                <div className="table-responsive mt-3">
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