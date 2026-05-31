import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function FindForecast() {
    const [forecasts, setForecasts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchForecasts();
    }, []);

    const fetchForecasts = () => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/forecast/fetchAll", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            setForecasts(response.data);
            setError("");
            setLoading(false);
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 403 || error.response.status === 404) {
                    setError("No forecasts found.");
                } else {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                }
            } else if (error.request) {
                setError("No response from server. Make sure the backend is running on port 9011.");
            } else {
                setError("Error: " + error.message);
            }
            setLoading(false);
        });
    };

    return (
        <div className="container mt-4">
            <h2>All Forecasts</h2>

            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && forecasts.length === 0 && !error && (
                <div className="alert alert-info">No forecasts found.</div>
            )}

            {forecasts.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Forecast ID</th>
                                <th>Product SKU</th>
                                <th>Location ID</th>
                                <th>Period</th>
                                <th>Forecast Qty</th>
                                <th>Generated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.map((f) => (
                                <tr key={f.forecastId}>
                                    <td>{f.forecastId}</td>
                                    <td>{f.product?.sku}</td>
                                    <td>{f.location?.locationId}</td>
                                    <td>{f.period}</td>
                                    <td>{f.forecastQty}</td>
                                    <td>{f.generatedAt}</td>
                                    <td>
                                        <Link
                                            to={`/Forecast/updateForecast/${f.forecastId}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => navigate(`/Forecast/deleteForecast/${f.forecastId}`)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}