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

    useEffect(() => {
        if (!fcid) return;
        axios.get(`http://localhost:9011/api/forecast/find/${fcid}`)
            .then((response) => {
                const f = response.data;
                setSku(f.product?.sku || "");
                setLocationId(f.location?.locationId || "");
                setPeriod(f.period || "");
                setForecastQty(f.forecastQty || "");
            })
            .catch((error) => {
                alert("Error fetching forecast: " + (error.response?.data?.message || error.message));
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
            alert("Update Failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <h2>Update Forecast</h2>

            <label>Forecast ID</label>
            <input type="text" value={fcid} readOnly />
            <br />

            <label>Product SKU</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
            <br />

            <label>Location ID</label>
            <input type="number" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
            <br />

            <label>Period</label>
            <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} />
            <br />

            <label>Forecast Quantity</label>
            <input type="number" value={forecastQty} onChange={(e) => setForecastQty(e.target.value)} />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
            <button onClick={() => navigate("/Forecast/findForecast")}>Cancel</button>
        </div>
    );
}