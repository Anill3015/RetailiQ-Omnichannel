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

    // ✅ Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSuccess("");
    };

    // ✅ ✅ STRONG VALIDATION
    const validate = () => {
        let newErrors = {};

        // ✅ Name validation (only letters, min 2 chars)
        const nameRegex = /^[A-Za-z\s]{2,}$/;

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(form.name)) {
            newErrors.name = "Only letters allowed (min 2 characters)";
        }

        // ✅ Advanced Email validation
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

    // ✅ Save handler
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
            setSuccess("Customer created successfully ");
            setForm({ name: "", email: "", preferences: "" });
            setErrors({});
        })
        .catch(() => {
            setErrors({ api: "Failed to create customer " });
        });
    };

    // ✅ Logout
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container mt-4">

            {/* ✅ Navbar */}
            <nav className="navbar bg-dark px-3 mb-4">
                <Link className="navbar-brand text-white text-decoration-none" to="/dashboard">
                    RetailIQ
                </Link>

                <button className="btn btn-danger btn-sm" onClick={logout}>
                    Logout
                </button>
            </nav>

            {/* ✅ Form */}
            <div className="card p-4 shadow">
                <h4 className="mb-3">Create Customer</h4>

                {/* API Error */}
                {errors.api && (
                    <div className="alert alert-danger">{errors.api}</div>
                )}

                {/* Success */}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                {/* ✅ Name */}
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
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* ✅ Email */}
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
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* ✅ Preferences */}
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

                {/* ✅ Button */}
                <button className="btn btn-primary" onClick={saveHandler}>
                    Save
                </button>

            </div>
        </div>
    );
}
