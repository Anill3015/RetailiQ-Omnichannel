// Feature: Safety Stock Calculator
// Place this file in: src/Forecast/components/SafetyStockCalculator.js

import axios from 'axios';
import { useState } from 'react';

export default function SafetyStockCalculator() {
    const [forecastId, setForecastId] = useState("");
    const [forecast, setForecast] = useState(null);
    const [safetyStock, setSafetyStock] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Feature: Safety stock = 20% of forecast qty (matches backend logic)
    const calculateSafetyStock = (forecastQty) => {
        return Math.ceil(forecastQty * 0.2);
    };

    const calculateHandler = () => {
        if (!forecastId) {
            setError("Please enter a Forecast ID");
            return;
        }

        setLoading(true);
        setError("");
        setSafetyStock(null);

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/forecast/find/${forecastId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            const f = response.data;
            setForecast(f);
            const stock = calculateSafetyStock(f.forecastQty);
            setSafetyStock(stock);
            setLoading(false);
        })
        .catch(() => {
            setError("Forecast not found with ID: " + forecastId);
            setLoading(false);
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h4 className="mb-2">
                    <i className="bi bi-calculator me-2"></i>
                    Safety Stock Calculator
                </h4>
                <p className="text-muted mb-3">
                    Calculates safety stock as 20% of forecast quantity to prevent stockouts.
                </p>

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Forecast ID"
                        value={forecastId}
                        onChange={(e) => {
                            setForecastId(e.target.value);
                            setError("");
                            setForecast(null);
                            setSafetyStock(null);
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={calculateHandler}
                        disabled={loading}
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {forecast && safetyStock !== null && (
                    <div className="mt-2">
                        {/* Forecast Info */}
                        <div className="card bg-light border-0 mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="mb-1"><strong>Forecast ID:</strong> {forecast.forecastId}</p>
                                        <p className="mb-1"><strong>Product SKU:</strong> {forecast.product?.sku}</p>
                                        <p className="mb-1"><strong>Location ID:</strong> {forecast.location?.locationId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-1"><strong>Period:</strong> {forecast.period}</p>
                                        <p className="mb-1"><strong>Generated At:</strong> {forecast.generatedAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calculation Result */}
                        <div className="row text-center">
                            <div className="col-md-4">
                                <div className="card border-primary">
                                    <div className="card-body">
                                        <h3 className="text-primary">{forecast.forecastQty}</h3>
                                        <p className="mb-0 text-muted">Forecast Quantity</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                <div>
                                    <h4 className="text-muted">× 20%</h4>
                                    <p className="mb-0 text-muted">Safety Factor</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-success bg-success text-white">
                                    <div className="card-body">
                                        <h3>{safetyStock}</h3>
                                        <p className="mb-0">Safety Stock</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Required */}
                        <div className="alert alert-info mt-3">
                            <strong>Total Required Stock:</strong> {forecast.forecastQty} + {safetyStock} = {" "}
                            <strong>{forecast.forecastQty + safetyStock} units</strong>
                            <br />
                            <small>= Forecast Qty + Safety Stock (20% buffer)</small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}