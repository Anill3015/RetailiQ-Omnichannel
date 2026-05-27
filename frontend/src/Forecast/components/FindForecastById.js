import axios from 'axios';
import { useState } from 'react';

export default function FindForecastById() {
    const [forecastId, setForecastId] = useState("");
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");

    const forecastIdHandler = (e) => setForecastId(e.target.value);

    const searchHandler = () => {
        if (!forecastId) {
            alert("Please enter a Forecast ID");
            return;
        }

        axios.get(`http://localhost:9011/api/forecast/find/${forecastId}`)
            .then((response) => {
                setForecast(response.data);
                setError("");
            })
            .catch((error) => {
                setForecast(null);
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    };

    return (
        <div className="container mt-4">
            <h2>Find Forecast By ID</h2>

            <div className="mb-3">
                <label className="form-label">Forecast ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Forecast ID"
                    value={forecastId}
                    onChange={forecastIdHandler}
                />
            </div>

            <button className="btn btn-primary" onClick={searchHandler}>Search</button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {forecast && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr><th>Forecast ID</th><td>{forecast.forecastId}</td></tr>
                        <tr><th>Product SKU</th><td>{forecast.product?.sku}</td></tr>
                        <tr><th>Location ID</th><td>{forecast.location?.locationId}</td></tr>
                        <tr><th>Period</th><td>{forecast.period}</td></tr>
                        <tr><th>Forecast Qty</th><td>{forecast.forecastQty}</td></tr>
                        <tr><th>Generated At</th><td>{forecast.generatedAt}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}