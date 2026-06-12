import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateReplenishment() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const [sku, setSku] = useState("");
    const [fromLocationId, setFromLocationId] = useState("");
    const [toLocationId, setToLocationId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/replenishment/find/${rid}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            const o = res.data;
            setSku(o.product?.sku || "");
            setFromLocationId(o.fromLocation?.locationId || "");
            setToLocationId(o.toLocation?.locationId || "");
            setQuantity(o.quantity || "");
            setStatus(o.status || "");
        })
        .catch(() => {
            setErrors({ api: "Failed to load replenishment data ❌" });
        });
    }, [rid]);

    const validate = () => {
        let newErrors = {};

        const skuRegex = /^[A-Za-z0-9-]{3,}$/;

        if (!sku.trim()) {
            newErrors.sku = "SKU is required";
        } else if (!skuRegex.test(sku)) {
            newErrors.sku = "Invalid SKU (e.g. NIKE-TS-RED-M)";
        }

        if (!fromLocationId) {
            newErrors.fromLocationId = "From Location ID is required";
        } else if (!/^[1-9][0-9]*$/.test(fromLocationId)) {
            newErrors.fromLocationId = "Must be a positive number";
        }

        if (!toLocationId) {
            newErrors.toLocationId = "To Location ID is required";
        } else if (!/^[1-9][0-9]*$/.test(toLocationId)) {
            newErrors.toLocationId = "Must be a positive number";
        }

        if (!quantity) {
            newErrors.quantity = "Quantity is required";
        } else if (!/^[1-9][0-9]*$/.test(quantity)) {
            newErrors.quantity = "Must be greater than 0";
        }

        if (!status.trim()) {
            newErrors.status = "Status is required";
        }

        return newErrors;
    };

    const updateHandler = () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setSuccess("");

        const token = localStorage.getItem("token");

        axios.put("http://localhost:9011/api/replenishment/update", {
            replenishmentOrder: {
                orderId: parseInt(rid),
                product: { sku: sku },
                fromLocation: { locationId: parseInt(fromLocationId) },
                toLocation: { locationId: parseInt(toLocationId) },
                quantity: parseInt(quantity),
                status: status
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Replenishment order updated successfully ✅");
            setTimeout(() => {
                navigate("/Replenishment/findReplenishment");
            }, 1500);
        })
        .catch(() => {
            setErrors({ api: "Update failed ❌" });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4 className="mb-3">Update Replenishment Order</h4>

                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <div className="mb-3">
                    <label className="form-label">Order ID</label>
                    <input className="form-control" value={rid} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product SKU <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                        value={sku}
                        onChange={(e) => {
                            setSku(e.target.value);
                            setErrors({ ...errors, sku: "" });
                        }}
                        placeholder="Enter product SKU"
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
                        className={`form-control ${errors.fromLocationId ? 'is-invalid' : ''}`}
                        value={fromLocationId}
                        onChange={(e) => {
                            setFromLocationId(e.target.value);
                            setErrors({ ...errors, fromLocationId: "" });
                        }}
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
                        className={`form-control ${errors.toLocationId ? 'is-invalid' : ''}`}
                        value={toLocationId}
                        onChange={(e) => {
                            setToLocationId(e.target.value);
                            setErrors({ ...errors, toLocationId: "" });
                        }}
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
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            setErrors({ ...errors, quantity: "" });
                        }}
                        placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                        <div className="invalid-feedback">{errors.quantity}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Status <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setErrors({ ...errors, status: "" });
                        }}
                        placeholder="Enter status"
                    />
                    {errors.status && (
                        <div className="invalid-feedback">{errors.status}</div>
                    )}
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