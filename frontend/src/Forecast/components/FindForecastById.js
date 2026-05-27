import axios from 'axios';
import { useState } from 'react';

export default function FindForecastById() {
    const [forecastId, setForecastId] = useState("");
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");

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
            .catch(() => {
                setForecast(null);
                setError("Forecast not found with ID: " + forecastId);
            });
    };

    return (
        <div>
            <h2>Find Forecast By ID</h2>

            <label>Forecast ID</label>
            <input
                type="number"
                placeholder="Enter Forecast ID"
                onChange={(e) => setForecastId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {forecast && (
                <table border="1">
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