import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindForecast() {
    const [forecasts, setForecasts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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

    const deleteHandler = (fcid) => {
        if (!window.confirm(`Are you sure you want to delete Forecast ID: ${fcid}?`)) return;

        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:9011/api/forecast/delete/${fcid}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(() => {
            alert("Forecast deleted successfully!");
            fetchForecasts();
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 403 || error.response.status === 404) {
                    alert("Record not found with ID: " + fcid);
                } else {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                }
            } else if (error.request) {
                alert("No response from server. Make sure the backend is running on port 9011.");
            } else {
                alert("Error: " + error.message);
            }
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
                                            onClick={() => deleteHandler(f.forecastId)}
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