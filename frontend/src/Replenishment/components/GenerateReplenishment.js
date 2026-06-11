// Feature: Suggested PO Generation / Replenishment Quantity from Forecast
// Place this file in: src/Replenishment/components/GenerateReplenishment.js

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GenerateReplenishment() {
    const navigate = useNavigate();

    const [forecastId, setForecastId] = useState("");
    const [fromLocationId, setFromLocationId] = useState("");
    const [toLocationId, setToLocationId] = useState("");
    const [forecast, setForecast] = useState(null);
    const [suggestedQty, setSuggestedQty] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    // Feature: Replenishment qty = forecastQty + 20% safety stock (matches backend logic)
    const calculateReplenishmentQty = (forecastQty) => {
        const safetyStock = Math.ceil(forecastQty * 0.2);
        return forecastQty + safetyStock;
    };

    const fetchForecast = () => {
        if (!forecastId) {
            setError("Please enter a Forecast ID");
            return;
        }

        setLoading(true);
        setError("");
        setForecast(null);
        setSuggestedQty(null);

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/forecast/find/${forecastId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            const f = response.data;
            setForecast(f);
            setSuggestedQty(calculateReplenishmentQty(f.forecastQty));
            setLoading(false);
        })
        .catch(() => {
            setError("Forecast not found with ID: " + forecastId);
            setLoading(false);
        });
    };

    const generateHandler = () => {
        if (!fromLocationId || !toLocationId) {
            setError("From and To Location IDs are required");
            return;
        }

        if (fromLocationId === toLocationId) {
            setError("From and To locations cannot be the same");
            return;
        }

        const token = localStorage.getItem("token");

        axios.post("http://localhost:9011/api/replenishment/add", {
            replenishmentOrder: {
                product: { sku: forecast.product?.sku },
                fromLocation: { locationId: parseInt(fromLocationId) },
                toLocation: { locationId: parseInt(toLocationId) },
                quantity: suggestedQty
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            setSuccess(`Replenishment Order Generated! ID: ${response.data.replenishmentOrder?.replenishmentId}`);
            setTimeout(() => {
                navigate("/Replenishment/findReplenishment");
            }, 1500);
        })
        .catch((err) => {
            setError(err.response?.data?.message || "Failed to generate replenishment order");
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h4 className="mb-2">
                    <i className="bi bi-lightning me-2"></i>
                    Generate Replenishment from Forecast
                </h4>
                <p className="text-muted mb-3">
                    Auto-generates a replenishment order based on forecast demand + 20% safety stock buffer.
                </p>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {/* Step 1: Enter Forecast ID */}
                <div className="card border-primary mb-3">
                    <div className="card-header bg-primary text-white">
                        Step 1: Load Forecast
                    </div>
                    <div className="card-body">
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Forecast ID"
                                value={forecastId}
                                onChange={(e) => {
                                    setForecastId(e.target.value);
                                    setError("");
                                    setForecast(null);
                                    setSuggestedQty(null);
                                }}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={fetchForecast}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Load"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Forecast Details */}
                {forecast && (
                    <>
                        <div className="card border-0 bg-light mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="mb-1"><strong>Product SKU:</strong> {forecast.product?.sku}</p>
                                        <p className="mb-1"><strong>Period:</strong> {forecast.period}</p>
                                        <p className="mb-1"><strong>Location:</strong> {forecast.location?.locationId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-1"><strong>Forecast Qty:</strong> {forecast.forecastQty}</p>
                                        <p className="mb-1"><strong>Safety Stock (20%):</strong> {Math.ceil(forecast.forecastQty * 0.2)}</p>
                                        <p className="mb-1 text-success fw-bold">
                                            <strong>Suggested Order Qty:</strong> {suggestedQty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Enter Locations */}
                        <div className="card border-success mb-3">
                            <div className="card-header bg-success text-white">
                                Step 2: Set Transfer Locations
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            From Location ID <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Source location"
                                            value={fromLocationId}
                                            onChange={(e) => setFromLocationId(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            To Location ID <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Destination location"
                                            value={toLocationId}
                                            onChange={(e) => setToLocationId(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="alert alert-info mb-3">
                                    <strong>Order Summary:</strong> Transfer{" "}
                                    <strong>{suggestedQty} units</strong> of{" "}
                                    <strong>{forecast.product?.sku}</strong>{" "}
                                    from Location {fromLocationId || "?"} → Location {toLocationId || "?"}
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={generateHandler}
                                    disabled={!fromLocationId || !toLocationId}
                                >
                                    Generate Replenishment Order
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}