// Feature: Loyalty Tier Calculator
// Place this file in: src/CustomerProfile/components/LoyaltyTierCalculator.js

import axios from 'axios';
import { useState } from 'react';

export default function LoyaltyTierCalculator() {
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Feature: Calculate loyalty tier based on recommendation count
    const calculateTier = (recCount) => {
        if (recCount >= 20) return { tier: "PLATINUM", color: "secondary", min: 20, next: null };
        if (recCount >= 10) return { tier: "GOLD", color: "warning", min: 10, next: 20 };
        return { tier: "SILVER", color: "info", min: 0, next: 10 };
    };

    const searchHandler = () => {
        if (!customerId) {
            setError("Please enter a Customer ID");
            return;
        }

        setLoading(true);
        setError("");
        setCustomer(null);

        const token = localStorage.getItem("token");

        // Fetch customer profile
        axios.get(`http://localhost:9011/api/customer/find/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            const customerData = response.data;

            // Fetch recommendations to calculate loyalty tier
            return axios.get(
                `http://localhost:9011/api/recommendation/customer/${customerId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((recResponse) => {
                const recCount = recResponse.data.length;
                const tierInfo = calculateTier(recCount);
                setCustomer({
                    ...customerData,
                    recCount,
                    tierInfo
                });
                setLoading(false);
            });
        })
        .catch((err) => {
            setError("Customer not found with ID: " + customerId);
            setLoading(false);
        });
    };

    const progressPercent = customer
        ? customer.tierInfo.next
            ? Math.min((customer.recCount / customer.tierInfo.next) * 100, 100)
            : 100
        : 0;

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h4 className="mb-3">
                    <i className="bi bi-award me-2"></i>
                    Loyalty Tier Calculator
                </h4>
                <p className="text-muted">
                    Calculate a customer's loyalty tier based on their recommendation history.
                    <br />
                    <small>SILVER: 0-9 recommendations | GOLD: 10-19 | PLATINUM: 20+</small>
                </p>

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Customer ID"
                        value={customerId}
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                            setError("");
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={searchHandler}
                        disabled={loading}
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {customer && (
                    <div className="mt-3">
                        {/* Customer Info */}
                        <div className="card mb-3 border-0 bg-light">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="mb-1"><strong>Name:</strong> {customer.name}</p>
                                        <p className="mb-1"><strong>Email:</strong> {customer.email}</p>
                                        <p className="mb-1"><strong>Preferences:</strong> {customer.preferences || "N/A"}</p>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <span className={`badge bg-${customer.tierInfo.color} fs-4 px-4 py-2`}>
                                            {customer.tierInfo.tier}
                                        </span>
                                        <p className="mt-2 text-muted">Current Tier</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation Count */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span><strong>Recommendations:</strong> {customer.recCount}</span>
                                {customer.tierInfo.next && (
                                    <span className="text-muted">
                                        {customer.tierInfo.next - customer.recCount} more to next tier
                                    </span>
                                )}
                            </div>
                            <div className="progress" style={{ height: "20px" }}>
                                <div
                                    className={`progress-bar bg-${customer.tierInfo.color}`}
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    {Math.round(progressPercent)}%
                                </div>
                            </div>
                        </div>

                        {/* Tier Breakdown */}
                        <div className="row text-center mt-3">
                            <div className="col-4">
                                <div className={`card border-info ${customer.recCount >= 0 ? 'border-2' : ''}`}>
                                    <div className="card-body py-2">
                                        <span className="badge bg-info mb-1">SILVER</span>
                                        <p className="mb-0 small">0 - 9 recs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`card border-warning ${customer.recCount >= 10 ? 'border-2' : ''}`}>
                                    <div className="card-body py-2">
                                        <span className="badge bg-warning text-dark mb-1">GOLD</span>
                                        <p className="mb-0 small">10 - 19 recs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`card border-secondary ${customer.recCount >= 20 ? 'border-2' : ''}`}>
                                    <div className="card-body py-2">
                                        <span className="badge bg-secondary mb-1">PLATINUM</span>
                                        <p className="mb-0 small">20+ recs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}