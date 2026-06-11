// Feature: Purchase & Recommendation History
// Place this file in: src/CustomerProfile/components/CustomerHistory.js

import axios from 'axios';
import { useState } from 'react';

export default function CustomerHistory() {
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchHistory = () => {
        if (!customerId) {
            setError("Please enter a Customer ID");
            return;
        }

        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch customer profile and recommendations together
        Promise.all([
            axios.get(`http://localhost:9011/api/customer/find/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`http://localhost:9011/api/recommendation/customer/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ])
        .then(([customerRes, recRes]) => {
            setCustomer(customerRes.data);
            setRecommendations(recRes.data);
            setLoading(false);
        })
        .catch(() => {
            setError("Could not fetch history for Customer ID: " + customerId);
            setLoading(false);
        });
    };

    // Feature: Extract all unique SKUs from recommendation history (browsing history simulation)
    const getAllSkus = () => {
        const allSkus = recommendations.flatMap(r => r.skuList || []);
        return [...new Set(allSkus)];
    };

    // Feature: Get most recommended SKU
    const getMostRecommendedSku = () => {
        const skuCount = {};
        recommendations.forEach(r => {
            (r.skuList || []).forEach(sku => {
                skuCount[sku] = (skuCount[sku] || 0) + 1;
            });
        });
        return Object.entries(skuCount).sort((a, b) => b[1] - a[1])[0];
    };

    const uniqueSkus = customer ? getAllSkus() : [];
    const topSku = customer && recommendations.length > 0 ? getMostRecommendedSku() : null;

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h4 className="mb-3">
                    <i className="bi bi-clock-history me-2"></i>
                    Customer Recommendation History
                </h4>

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Customer ID"
                        value={customerId}
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                            setError("");
                            setCustomer(null);
                            setRecommendations([]);
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={fetchHistory}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "View History"}
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {customer && (
                    <>
                        {/* Customer Summary */}
                        <div className="card bg-light border-0 mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h5 className="mb-1">{customer.name}</h5>
                                        <p className="mb-1 text-muted">{customer.email}</p>
                                        <p className="mb-0">
                                            Preferences: <strong>{customer.preferences || "N/A"}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <span className={`badge fs-6 px-3 py-2 ${
                                            customer.loyaltyTier === 'PLATINUM' ? 'bg-secondary' :
                                            customer.loyaltyTier === 'GOLD' ? 'bg-warning text-dark' :
                                            'bg-info'
                                        }`}>
                                            {customer.loyaltyTier}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <div className="card text-center border-primary">
                                    <div className="card-body py-3">
                                        <h3 className="text-primary">{recommendations.length}</h3>
                                        <p className="mb-0 text-muted">Total Recommendations</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center border-success">
                                    <div className="card-body py-3">
                                        <h3 className="text-success">{uniqueSkus.length}</h3>
                                        <p className="mb-0 text-muted">Unique SKUs Browsed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-center border-warning">
                                    <div className="card-body py-3">
                                        <h3 className="text-warning">{topSku ? topSku[0] : "N/A"}</h3>
                                        <p className="mb-0 text-muted">
                                            Top SKU {topSku ? `(${topSku[1]}x)` : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation History Table */}
                        {recommendations.length === 0 ? (
                            <div className="alert alert-info">
                                No recommendation history found for this customer.
                            </div>
                        ) : (
                            <>
                                <h5 className="mb-2">Recommendation History</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover align-middle">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Rec ID</th>
                                                <th>SKU List</th>
                                                <th>Generated At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recommendations.map((r, index) => (
                                                <tr key={r.recId}>
                                                    <td>{index + 1}</td>
                                                    <td>{r.recId}</td>
                                                    <td>
                                                        {(r.skuList || []).map(sku => (
                                                            <span key={sku}
                                                                className="badge bg-secondary me-1">
                                                                {sku}
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td>{r.generatedAt}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* All Unique SKUs */}
                                <div className="mt-3">
                                    <h6>All Browsed SKUs:</h6>
                                    <div>
                                        {uniqueSkus.map(sku => (
                                            <span key={sku} className="badge bg-primary me-1 mb-1 fs-6">
                                                {sku}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}