import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateForecast() {
    const [sku, setSku] = useState("");
    const [locationId, setLocationId] = useState("");
    const [period, setPeriod] = useState("");
    const [forecastQty, setForecastQty] = useState("");
    const navigate = useNavigate();

    const saveHandler = () => {
        if (!sku || !locationId || !period || !forecastQty) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/forecast/add";
        const data = {
            "forecast": {
                "product": { "sku": sku },
                "location": { "locationId": parseInt(locationId) },
                "period": period,
                "forecastQty": parseInt(forecastQty),
                "generatedAt": new Date().toISOString().slice(0, 19)
            }
        };

        axios.post(url, data)
            .then((response) => {
                alert(response.data.message);
                setSku("");
                setLocationId("");
                setPeriod("");
                setForecastQty("");
                navigate("/Forecast/findForecast");
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Create Forecast</h2>

            <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. NIKE-TS-RED-M"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Location ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 1"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Period</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2026-05"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Forecast Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 150"
                    value={forecastQty}
                    onChange={(e) => setForecastQty(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={saveHandler}>
                SAVE
            </button>
        </div>
    );
}