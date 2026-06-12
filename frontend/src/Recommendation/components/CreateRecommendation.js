import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRecommendation() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerId: "",
        skuList: ""
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

        if (!form.customerId) {
            newErrors.customerId = "Customer ID is required";
        } else if (!/^[1-9][0-9]*$/.test(form.customerId)) {
            newErrors.customerId = "Must be a positive number";
        }

        if (!form.skuList.trim()) {
            newErrors.skuList = "SKU List is required";
        } else {
            const skuRegex = /^[A-Za-z0-9-]{3,}$/;
            const skus = form.skuList.split(",").map(s => s.trim());
            const invalidSkus = skus.filter(s => !skuRegex.test(s));
            if (invalidSkus.length > 0) {
                newErrors.skuList = `Invalid SKU(s): ${invalidSkus.join(", ")}`;
            }
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

        axios.post("http://localhost:9011/api/recommendation/add", {
            recommendation: {
                customer: {
                    customerId: parseInt(form.customerId)
                },
                skuList: form.skuList.split(",").map(s => s.trim())
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Recommendation created successfully ✅");
            setForm({ customerId: "", skuList: "" });
            setTimeout(() => {
                navigate("/Recommendation/findRecommendation");
            }, 1000);
        })
        .catch((error) => {
            setErrors({
                api: error.response?.data?.message || "Failed to create recommendation ❌"
            });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4>Create Recommendation</h4>

                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <div className="mb-3">
                    <label className="form-label">
                        Customer ID <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        name="customerId"
                        className={`form-control ${errors.customerId ? 'is-invalid' : ''}`}
                        value={form.customerId}
                        onChange={handleChange}
                        placeholder="Enter Customer ID"
                    />
                    {errors.customerId && (
                        <div className="invalid-feedback">{errors.customerId}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        SKU List (comma separated) <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="skuList"
                        className={`form-control ${errors.skuList ? 'is-invalid' : ''}`}
                        value={form.skuList}
                        onChange={handleChange}
                        placeholder="e.g. SKU001, SKU002"
                    />
                    {errors.skuList && (
                        <div className="invalid-feedback">{errors.skuList}</div>
                    )}
                </div>

                <button className="btn btn-primary" onClick={saveHandler}>Save</button>
            </div>
        </div>
    );
}