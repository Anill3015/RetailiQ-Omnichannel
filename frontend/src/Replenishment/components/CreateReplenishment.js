import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateReplenishment() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        sku: "",
        fromLocationId: "",
        toLocationId: "",
        quantity: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSuccess("");
    };

    const validate = () => {
        let newErrors = {};

        const skuRegex = /^[A-Za-z0-9-]{3,}$/;

        if (!form.sku.trim()) {
            newErrors.sku = "SKU is required";
        } else if (!skuRegex.test(form.sku)) {
            newErrors.sku = "Invalid SKU (e.g. NIKE-TS-RED-M)";
        }

        if (!form.fromLocationId) {
            newErrors.fromLocationId = "From Location ID is required";
        } else if (!/^[1-9][0-9]*$/.test(form.fromLocationId)) {
            newErrors.fromLocationId = "Must be a positive number";
        }

        if (!form.toLocationId) {
            newErrors.toLocationId = "To Location ID is required";
        } else if (!/^[1-9][0-9]*$/.test(form.toLocationId)) {
            newErrors.toLocationId = "Must be a positive number";
        }

        if (!form.quantity) {
            newErrors.quantity = "Quantity is required";
        } else if (!/^[1-9][0-9]*$/.test(form.quantity)) {
            newErrors.quantity = "Must be greater than 0";
        }

        return newErrors;
    };

    const saveHandler = () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const token = localStorage.getItem("token");

        axios.post("http://localhost:9011/api/replenishment/add", {
            replenishmentOrder: {
                product: { sku: form.sku },
                fromLocation: { locationId: parseInt(form.fromLocationId) },
                toLocation: { locationId: parseInt(form.toLocationId) },
                quantity: parseInt(form.quantity)
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Replenishment Order Created Successfully ✅");
            setForm({ sku: "", fromLocationId: "", toLocationId: "", quantity: "" });
            setTimeout(() => {
                navigate("/Replenishment/findReplenishment");
            }, 1000);
        })
        .catch((error) => {
            setErrors({
                api: error.response?.data?.message || "Failed to create replenishment order ❌"
            });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4>Create Replenishment Order</h4>

                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

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
                    {errors.sku && (
                        <div className="invalid-feedback">{errors.sku}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        From Location ID <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="fromLocationId"
                        className={`form-control ${errors.fromLocationId ? 'is-invalid' : ''}`}
                        value={form.fromLocationId}
                        onChange={handleChange}
                        placeholder="Enter from location ID"
                    />
                    {errors.fromLocationId && (
                        <div className="invalid-feedback">{errors.fromLocationId}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        To Location ID <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="toLocationId"
                        className={`form-control ${errors.toLocationId ? 'is-invalid' : ''}`}
                        value={form.toLocationId}
                        onChange={handleChange}
                        placeholder="Enter to location ID"
                    />
                    {errors.toLocationId && (
                        <div className="invalid-feedback">{errors.toLocationId}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Quantity <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                        <div className="invalid-feedback">{errors.quantity}</div>
                    )}
                </div>

                <button className="btn btn-primary" onClick={saveHandler}>Save</button>
            </div>
        </div>
    );
}