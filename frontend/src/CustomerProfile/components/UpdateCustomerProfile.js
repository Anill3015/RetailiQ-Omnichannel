import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCustomerProfile() {

    const { cpid } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    // ✅ Load existing data
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:9011/api/customer/find/${cpid}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            const c = res.data;
            setName(c.name || "");
            setEmail(c.email || "");
            setPreferences(c.preferences || "");
        })
        .catch(() => {
            setErrors({ api: "Failed to load customer data ❌" });
        });

    }, [cpid]);

    // ✅ Validation
    const validate = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
            }
        }

        return newErrors;
    };

    // ✅ Update handler
    const updateHandler = () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setSuccess("");

        const token = localStorage.getItem("token");

        axios.put("http://localhost:9011/api/customer/update", {
            customerProfile: {
                customerId: parseInt(cpid),
                name,
                email,
                preferences
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            setSuccess("Customer updated successfully ✅");

            setTimeout(() => {
                navigate("/CustomerProfile/findCustomerProfile");
            }, 1500);
        })
        .catch(() => {
            setErrors({ api: "Update failed ❌" });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4 className="mb-3">Update Customer Profile</h4>

                {/* API Error */}
                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {/* Success */}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                {/* Customer ID */}
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input className="form-control" value={cpid} readOnly />
                </div>

                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors({ ...errors, name: "" });
                        }}
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" });
                        }}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* Preferences */}
                <div className="mb-3">
                    <label className="form-label">Preferences</label>
                    <input
                        className="form-control"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        placeholder="Enter preferences"
                    />
                </div>

                {/* Buttons */}
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
