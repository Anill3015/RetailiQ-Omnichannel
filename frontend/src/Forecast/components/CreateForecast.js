import axios from 'axios';
import { useState } from 'react';

export default function CreateForecast() {
    const [sku, setSku] = useState("");
    const [locationId, setLocationId] = useState("");
    const [period, setPeriod] = useState("");
    const [forecastQty, setForecastQty] = useState("");

    const saveHandler = () => {
        if (!sku || !locationId || !period || !forecastQty) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/forecast/add";
        const data = {
            forecast: {
                product: { sku: sku },
                location: { locationId: parseInt(locationId) },
                period: period,
                forecastQty: parseInt(forecastQty)
            }
        };

        axios.post(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Forecast Created! " + response.data.message);
        })
        .catch((error) => {
            alert("Error: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <h2>Create Forecast</h2>

            <label>Product SKU</label>
            <input type="text" placeholder="e.g. SKU001" onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>Location ID</label>
            <input type="number" onChange={(e) => setLocationId(e.target.value)} />
            <br />

            <label>Period</label>
            <input type="text" placeholder="e.g. 2024-Q1" onChange={(e) => setPeriod(e.target.value)} />
            <br />

            <label>Forecast Quantity</label>
            <input type="number" onChange={(e) => setForecastQty(e.target.value)} />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}