import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateRecommendation() {
    const { rid } = useParams();
    const navigate = useNavigate();

    const [customerId, setCustomerId] = useState("");
    const [skuList, setSkuList] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!rid) return;
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/recommendation/find/${rid}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            const r = res.data;
            setCustomerId(r.customer?.customerId || "");
            setSkuList(r.skuList?.join(", ") || "");
        })
        .catch(() => {
            setErrors({ api: "Failed to load recommendation data ❌" });
        });
    }, [rid]);

    const validate = () => {
        let newErrors = {};

        if (!customerId) {
            newErrors.customerId = "Customer ID is required";
        } else if (!/^[1-9][0-9]*$/.test(customerId)) {
            newErrors.customerId = "Must be a positive number";
        }

        if (!skuList.trim()) {
            newErrors.skuList = "SKU List is required";
        } else {
            const skuRegex = /^[A-Za-z0-9-]{3,}$/;
            const skus = skuList.split(",").map(s => s.trim());
            const invalidSkus = skus.filter(s => !skuRegex.test(s));
            if (invalidSkus.length > 0) {
                newErrors.skuList = `Invalid SKU(s): ${invalidSkus.join(", ")}`;
            }
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

        axios.put("http://localhost:9011/api/recommendation/update", {
            recommendation: {
                recId: parseInt(rid),
                customer: {
                    customerId: parseInt(customerId)
                },
                skuList: skuList.split(",").map(s => s.trim())
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Recommendation updated successfully ✅");
            setTimeout(() => {
                navigate("/Recommendation/findRecommendation");
            }, 1500);
        })
        .catch(() => {
            setErrors({ api: "Update failed ❌" });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4 className="mb-3">Update Recommendation</h4>

                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <div className="mb-3">
                    <label className="form-label">Rec ID</label>
                    <input className="form-control" type="text" value={rid} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Customer ID <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className={`form-control ${errors.customerId ? 'is-invalid' : ''}`}
                        value={customerId}
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                            setErrors({ ...errors, customerId: "" });
                        }}
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
                        className={`form-control ${errors.skuList ? 'is-invalid' : ''}`}
                        value={skuList}
                        onChange={(e) => {
                            setSkuList(e.target.value);
                            setErrors({ ...errors, skuList: "" });
                        }}
                        placeholder="e.g. SKU001, SKU002"
                    />
                    {errors.skuList && (
                        <div className="invalid-feedback">{errors.skuList}</div>
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