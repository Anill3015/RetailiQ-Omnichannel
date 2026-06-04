import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function FindForecast() {
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
        axios.get("http://localhost:9011/api/forecast/fetchAll")
=======
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/api/forecast/fetchAll", {
            headers: { "Authorization": `Bearer ${token}` }
        })
>>>>>>> Rakesh
            .then((response) => {
                setForecasts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching forecasts:", error);
            });
    }, []);

    return (
<<<<<<< HEAD
        <div>
            <h2>All Forecasts</h2>
            <table border="1">
                <thead>
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
                                {/* ✅ Absolute paths */}
                                <Link to={`/Forecast/updateForecast/${f.forecastId}`}>Edit</Link>
                                {" | "}
                                <Link to={`/Forecast/deleteForecast/${f.forecastId}`}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
=======
        <div className="container mt-4">
            <h2 className="mb-3">All Forecasts</h2>
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
                                    <Link
                                        to={`/Forecast/deleteForecast/${f.forecastId}`}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
>>>>>>> Rakesh
        </div>
    );
}