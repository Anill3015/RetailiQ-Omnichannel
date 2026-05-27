import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function UpdateForecast() {
    const { fcid } = useParams();
    const navigate = useNavigate();

    const [sku, setSku] = useState("");
    const [locationId, setLocationId] = useState("");
    const [period, setPeriod] = useState("");
    const [forecastQty, setForecastQty] = useState("");

    const skuHandler = (e) => setSku(e.target.value);
    const locationIdHandler = (e) => setLocationId(e.target.value);
    const periodHandler = (e) => setPeriod(e.target.value);
    const forecastQtyHandler = (e) => setForecastQty(e.target.value);

    useEffect(() => {
        if (!fcid) return;
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/api/forecast/find/${fcid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        }   )
            .then((response) => {
                const f = response.data;
                setSku(f.product?.sku || "");
                setLocationId(f.location?.locationId || "");
                setPeriod(f.period || "");
                setForecastQty(f.forecastQty || "");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9011.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    }, [fcid]);

    const updateHandler = () => {
        if (!sku || !locationId || !period || !forecastQty) {
            alert("All fields are required");
            return;
        }

        const url = "http://localhost:9011/api/forecast/update";
        const data = {
            forecast: {
                forecastId: parseInt(fcid),
                product: { sku: sku },
                location: { locationId: parseInt(locationId) },
                period: period,
                forecastQty: parseInt(forecastQty)
            }
        };

        axios.put(url, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Forecast Updated! " + response.data.message);
            navigate("/Forecast/findForecast");
        })
        .catch((error) => {
            if (error.response) {
                alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Update Forecast</h2>

            <div className="mb-3">
                <label className="form-label">Forecast ID</label>
                <input className="form-control" type="text" value={fcid} readOnly />
            </div>

            <div className="mb-3">
                <label className="form-label">Product SKU</label>
                <input className="form-control" type="text" value={sku} onChange={skuHandler} placeholder="Enter product SKU" />
            </div>

            <div className="mb-3">
                <label className="form-label">Location ID</label>
                <input className="form-control" type="number" value={locationId} onChange={locationIdHandler} placeholder="Enter location ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Period</label>
                <input className="form-control" type="text" value={period} onChange={periodHandler} placeholder="e.g. 2026-05" />
            </div>

            <div className="mb-3">
                <label className="form-label">Forecast Quantity</label>
                <input className="form-control" type="number" value={forecastQty} onChange={forecastQtyHandler} placeholder="Enter forecast quantity" />
            </div>

            <button className="btn btn-primary me-2" onClick={updateHandler}>Update</button>
            <button className="btn btn-secondary" onClick={() => navigate("/Forecast/findForecast")}>Cancel</button>
        </div>
    );
}