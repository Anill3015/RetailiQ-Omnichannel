import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateForecast() {
    const [sku, setSku] = useState("");
    const [locationId, setLocationId] = useState("");
    const [period, setPeriod] = useState("");
    const [forecastQty, setForecastQty] = useState("");
    const navigate = useNavigate();

<<<<<<< HEAD
=======
    const skuHandler = (e) => setSku(e.target.value);
    const locationIdHandler = (e) => setLocationId(e.target.value);
    const periodHandler = (e) => setPeriod(e.target.value);
    const forecastQtyHandler = (e) => setForecastQty(e.target.value);

>>>>>>> Rakesh
    const saveHandler = () => {
        if (!sku || !locationId || !period || !forecastQty) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/forecast/add";
<<<<<<< HEAD

        // ✅ Wrap in forecast: {} because controller expects ForecastDTO
=======
>>>>>>> Rakesh
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
<<<<<<< HEAD
                // ✅ response.data is ForecastResponseDTO
=======
>>>>>>> Rakesh
                alert(response.data.message);
                setSku("");
                setLocationId("");
                setPeriod("");
                setForecastQty("");
                navigate("/Forecast/findForecast");
            })
            .catch((error) => {
<<<<<<< HEAD
                alert("Error: " + (error.response?.data?.message || error.message));
=======
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
            <h2>Create Forecast</h2>

            <label>Product SKU</label>
            <input
                type="text"
                placeholder="e.g. NIKE-TS-RED-M"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
            /><br />

            <label>Location ID</label>
            <input
                type="number"
                placeholder="e.g. 1"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
            /><br />

            <label>Period</label>
            <input
                type="text"
                placeholder="e.g. 2026-05"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
            /><br />

            <label>Forecast Quantity</label>
            <input
                type="number"
                placeholder="e.g. 150"
                value={forecastQty}
                onChange={(e) => setForecastQty(e.target.value)}
            /><br />

            <button onClick={saveHandler}>SAVE</button>
=======
        <div className="container mt-4">
            <h2>Create Forecast</h2>

            <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input className="form-control" value={sku} onChange={skuHandler} placeholder="e.g. NIKE-TS-RED-M" />
            </div>

            <div className="mb-3">
                <label className="form-label">Location ID</label>
                <input className="form-control" type="number" value={locationId} onChange={locationIdHandler} placeholder="e.g. 1" />
            </div>

            <div className="mb-3">
                <label className="form-label">Period</label>
                <input className="form-control" value={period} onChange={periodHandler} placeholder="e.g. 2026-05" />
            </div>

            <div className="mb-3">
                <label className="form-label">Forecast Quantity</label>
                <input className="form-control" type="number" value={forecastQty} onChange={forecastQtyHandler} placeholder="e.g. 150" />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
>>>>>>> Rakesh
        </div>
    );
}