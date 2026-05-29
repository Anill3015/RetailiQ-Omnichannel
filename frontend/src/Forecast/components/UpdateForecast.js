import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateForecast() {

    const { fcid } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        sku: "",
        locationId: "",
        period: "",
        forecastQty: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/forecast/find/${fcid}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            const f = res.data;
            setForm({
                sku: f.product?.sku || "",
                locationId: f.location?.locationId || "",
                period: f.period || "",
                forecastQty: f.forecastQty || ""
            });
        })
        .catch(() => {
            setErrors({ api: "Failed to load forecast ❌" });
        });
    }, [fcid]);

    const validate = () => {
        let newErrors = {};

        const skuRegex = /^[A-Za-z0-9-]{3,}$/;

        if (!form.sku.trim()) {
            newErrors.sku = "SKU is required";
        } else if (!skuRegex.test(form.sku)) {
            newErrors.sku = "Invalid SKU (e.g. NIKE-TS-RED-M)";
        }

        if (!form.locationId) {
            newErrors.locationId = "Location ID is required";
        } else if (!/^[1-9][0-9]*$/.test(form.locationId)) {
            newErrors.locationId = "Must be a positive number";
        }

        if (!form.period.trim()) {
            newErrors.period = "Period is required";
        } else if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(form.period)) {
            newErrors.period = "Format must be YYYY-MM (e.g. 2026-01)";
        }

        if (!form.forecastQty) {
            newErrors.forecastQty = "Forecast Quantity is required";
        } else if (!/^[1-9][0-9]*$/.test(form.forecastQty)) {
            newErrors.forecastQty = "Must be greater than 0";
        }

        return newErrors;
    };

    const updateHandler = () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const token = localStorage.getItem("token");

        axios.put("http://localhost:9011/api/forecast/update", {
            forecast: {
                forecastId: parseInt(fcid),
                product: { sku: form.sku },
                location: { locationId: parseInt(form.locationId) },
                period: form.period,
                forecastQty: parseInt(form.forecastQty)
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Forecast updated successfully ✅");
            setTimeout(() => {
                navigate("/Forecast/findForecast");
            }, 1000);
        })
        .catch((error) => {
            setErrors({
                api: error.response?.data?.message || "Update failed ❌"
            });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4>Update Forecast</h4>

                {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="mb-3">
                    <label className="form-label">Forecast ID</label>
                    <input className="form-control" value={fcid} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product SKU <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="sku"
                        className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                        value={form.sku}
                        onChange={handleChange}
                        placeholder="e.g. NIKE-TS-RED-M"
                    />
                    {errors.sku && <div className="invalid-feedback">{errors.sku}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Location ID <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="locationId"
                        className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                        value={form.locationId}
                        onChange={handleChange}
                        placeholder="Enter location ID"
                    />
                    {errors.locationId && <div className="invalid-feedback">{errors.locationId}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Period <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="period"
                        className={`form-control ${errors.period ? 'is-invalid' : ''}`}
                        value={form.period}
                        onChange={handleChange}
                        placeholder="e.g. 2026-01"
                        maxLength={7}
                    />
                    {errors.period && <div className="invalid-feedback">{errors.period}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Forecast Quantity <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="forecastQty"
                        className={`form-control ${errors.forecastQty ? 'is-invalid' : ''}`}
                        value={form.forecastQty}
                        onChange={handleChange}
                        placeholder="Enter forecast quantity"
                    />
                    {errors.forecastQty && <div className="invalid-feedback">{errors.forecastQty}</div>}
                </div>

                <button className="btn btn-primary me-2" onClick={updateHandler}>
                    Update
                </button>

                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}