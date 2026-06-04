<<<<<<< HEAD
import axios from 'axios';
import { useState } from 'react';

export default function FindReplenishmentById() {
    const [replenishmentId, setReplenishmentId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const searchHandler = () => {
        if (!replenishmentId) {
            alert("Please enter a Replenishment ID");
            return;
        }

        axios.get(`http://localhost:9011/api/replenishment/find/${replenishmentId}`)
            .then((response) => {
                setOrder(response.data);
                setError("");
            })
            .catch((error) => {
                setOrder(null);
                setError("Order not found with ID: " + replenishmentId +
                    " - " + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div>
            <h2>Find Replenishment Order By ID</h2>

            <label>Replenishment ID</label>
            <input
                type="number"
                placeholder="Enter Replenishment ID"
                onChange={(e) => setReplenishmentId(e.target.value)}
            />
            <button onClick={searchHandler}>SEARCH</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {order && (
                <table border="1">
                    <tbody>
                        {/* ✅ correct field name */}
                        <tr><th>Replenishment ID</th><td>{order.replenishmentId}</td></tr>
                        <tr><th>Product SKU</th><td>{order.product?.sku}</td></tr>
                        <tr><th>From Location</th><td>{order.fromLocation?.locationId}</td></tr>
                        <tr><th>To Location</th><td>{order.toLocation?.locationId}</td></tr>
                        <tr><th>Quantity</th><td>{order.quantity}</td></tr>
                        <tr><th>Status</th><td>{order.status}</td></tr>
=======
import axios from "axios";
import { useState } from "react";

export default function FindReplenishmentById() {

    const [id, setId] = useState("");
    const [replenishment, setReplenishment] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = () => {

        if (!id) {
            alert("Please enter an ID");
            return;
        }

        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/replenishment/find/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const data = response.data;   // similar to sample
            setReplenishment(data);
            setError("");
        })
        .catch((err) => {
            console.error(err);
            setReplenishment(null);
            setError("Record not found ❌");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Find Replenishment Order By ID</h2>

            <div className="mb-3">
                <label className="form-label">Enter ID</label>
                <input
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Replenishment ID"
                />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {replenishment && (
                <table className="table table-bordered table-striped mt-3">
                    <tbody>
                        <tr>
                            <th>Replenishment ID</th>
                            <td>{replenishment.replenishmentId}</td>
                        </tr>
                        <tr>
                            <th>Product SKU</th>
                            <td>{replenishment.product?.sku}</td>
                        </tr>
                        <tr>
                            <th>From Location</th>
                            <td>{replenishment.fromLocation?.locationId}</td>
                        </tr>
                        <tr>
                            <th>To Location</th>
                            <td>{replenishment.toLocation?.locationId}</td>
                        </tr>
                        <tr>
                            <th>Quantity</th>
                            <td>{replenishment.quantity}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{replenishment.status}</td>
                        </tr>
>>>>>>> Rakesh
                    </tbody>
                </table>
            )}
        </div>
    );
}