import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateCustomerProfile() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        preferences: ""
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

        const nameRegex = /^[A-Za-z\s]{2,}$/;

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(form.name)) {
            newErrors.name = "Only letters allowed (min 2 characters)";
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Enter valid email (ex: name@gmail.com)";
        } else if (form.email.startsWith('.') || form.email.endsWith('.')) {
            newErrors.email = "Email cannot start or end with dot";
        } else if (/^[0-9]+@/.test(form.email)) {
            newErrors.email = "Email should not start with only numbers";
        } else if (form.email.includes("..")) {
            newErrors.email = "Email cannot contain consecutive dots";
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

        axios.post("http://localhost:9011/api/customer/add", {
            customerProfile: form
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setSuccess("Customer created successfully ✅");
            setForm({ name: "", email: "", preferences: "" });
            setErrors({});
        })
        .catch(() => {
            setErrors({ api: "Failed to create customer ❌" });
        });
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h4 className="mb-3">Create Customer</h4>

                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <div className="mb-3">
                    <label className="form-label">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Preferences</label>
                    <input
                        name="preferences"
                        className="form-control"
                        value={form.preferences}
                        onChange={handleChange}
                        placeholder="Enter preferences"
                    />
                </div>

                <button className="btn btn-primary" onClick={saveHandler}>
                    Save
                </button>
            </div>
        </div>
    );
}