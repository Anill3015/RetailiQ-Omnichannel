import axios from 'axios';
import { useState } from 'react';
<<<<<<< HEAD

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
=======
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
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/recommendation/customer/${customerId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
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
>>>>>>> Rakesh
            });
    };

    return (
<<<<<<< HEAD
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
=======
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
>>>>>>> Rakesh
            )}
        </div>
    );
}