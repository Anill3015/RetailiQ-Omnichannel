import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let register = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !email || !password || !role || !phone || !username) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:9011/appuserapi/add", {
            "name": name,
            "email": email,
            "password": password,
            "phone": phone,
            "username": username,
            "role": { "roleId": role } 
        })
        .then(() => {
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        })
        .catch((err) => {
            console.error(err);

            if (err.response && err.response.data) {
                if (typeof err.response.data === "string") {
                    setError(err.response.data);
                } 
                else if (err.response.data.message) {
                    setError(err.response.data.message);
                } 
                else if (err.response.data.error) {
                    setError(err.response.data.error);
                } 
                else {
                    setError("Registration failed");
                }
            } else {
                setError("Registration failed");
            }

            setLoading(false);
        });


    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>

            <div className="card border-0 shadow-lg"
                style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', overflow: 'hidden' }}>

                {/* Header */}
                <div className="text-center py-4 px-4"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f3460)' }}>
                    <div className="mb-3">
                        <span className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow"
                            style={{ width: '68px', height: '68px' }}>
                            <i className="bi bi-person-plus"
                                style={{ fontSize: '30px', color: '#1e3a5f' }}></i>
                        </span>
                    </div>
                    <h3 className="text-white fw-bold mb-1 fs-4">RetailIQ</h3>
                    <p className="mb-0" style={{ color: '#a8c4e0', fontSize: '14px' }}>
                        Create your account to get started.
                    </p>
                </div>

                {/* Body */}
                <div className="card-body px-4 py-4" style={{ background: '#ffffff' }}>

                    {/* Success Alert */}
                    {success && (
                        <div className="d-flex align-items-center mb-4 px-3 py-2"
                            style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                borderLeft: '4px solid #16a34a',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: '#15803d'
                            }}>
                            <i className="bi bi-check-circle-fill me-2"
                                style={{ color: '#16a34a', fontSize: '16px' }}></i>
                            {success}
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div className="d-flex align-items-center mb-4 px-3 py-2"
                            style={{
                                background: '#fffbeb',
                                border: '1px solid #fcd34d',
                                borderLeft: '4px solid #f59e0b',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: '#92400e'
                            }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"
                                style={{ color: '#f59e0b', fontSize: '16px' }}></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={register}>

                        {/* Name + Username */}
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label className="form-label fw-semibold"
                                    style={{ fontSize: '12px', letterSpacing: '0.8px',
                                        textTransform: 'uppercase', color: '#64748b' }}>
                                    Full Name
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-end-0"
                                        style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                        <i className="bi bi-person" style={{ color: '#94a3b8' }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="enter name"
                                        value={name}
                                        style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                            background: '#f8fafc', color: '#1e293b' }}
                                        onChange={(e) => { setName(e.target.value); setError(""); }}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-semibold"
                                    style={{ fontSize: '12px', letterSpacing: '0.8px',
                                        textTransform: 'uppercase', color: '#64748b' }}>
                                    Username
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-end-0"
                                        style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                        <i className="bi bi-at" style={{ color: '#94a3b8' }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="enter username"
                                        value={username}
                                        style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                            background: '#f8fafc', color: '#1e293b' }}
                                        onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email + Phone */}
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label className="form-label fw-semibold"
                                    style={{ fontSize: '12px', letterSpacing: '0.8px',
                                        textTransform: 'uppercase', color: '#64748b' }}>
                                    Email
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-end-0"
                                        style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                        <i className="bi bi-envelope" style={{ color: '#94a3b8' }}></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="enter email"
                                        value={email}
                                        style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                            background: '#f8fafc', color: '#1e293b' }}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-semibold"
                                    style={{ fontSize: '12px', letterSpacing: '0.8px',
                                        textTransform: 'uppercase', color: '#64748b' }}>
                                    Phone
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-end-0"
                                        style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                        <i className="bi bi-telephone" style={{ color: '#94a3b8' }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="enter phone"
                                        value={phone}
                                        style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                            background: '#f8fafc', color: '#1e293b' }}
                                        onChange={(e) => { setPhone(e.target.value); setError(""); }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold"
                                style={{ fontSize: '12px', letterSpacing: '0.8px',
                                    textTransform: 'uppercase', color: '#64748b' }}>
                                Password
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-end-0"
                                    style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                    <i className="bi bi-lock" style={{ color: '#94a3b8' }}></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control border-start-0 border-end-0 ps-0"
                                    placeholder="enter password"
                                    value={password}
                                    style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                        background: '#f8fafc', color: '#1e293b' }}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                />
                                <button
                                    type="button"
                                    className="input-group-text border-start-0"
                                    style={{ background: '#f8fafc', borderColor: '#e2e8f0',
                                        cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                        style={{ color: '#94a3b8' }}></i>
                                </button>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold"
                                style={{ fontSize: '12px', letterSpacing: '0.8px',
                                    textTransform: 'uppercase', color: '#64748b' }}>
                                Role
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-end-0"
                                    style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                    <i className="bi bi-shield-lock" style={{ color: '#94a3b8' }}></i>
                                </span>
                                <select
                                    className="form-select border-start-0"
                                    value={role}
                                    style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                        background: '#f8fafc', color: '#1e293b' }}
                                    onChange={(e) => { setRole(e.target.value); setError(""); }}>
                                    <option value="">Select role</option>
                                    <option value="2">Store Associate</option>
                                    <option value="3">Ecommerce Manager</option>
                                    <option value="4">Inventory Planner</option>
                                    <option value="5">Fulfillment Manager</option>
                                    <option value="6">Customer Service Agent</option>
                                    <option value="7">Marketing Manager</option>

                                </select>
                            </div>
                        </div>

                        {/* Create Account Button */}
                        <div className="d-grid mb-2">
                            <button
                                type="submit"
                                className="btn btn-lg fw-semibold text-white"
                                disabled={loading}
                                style={{
                                    background: 'linear-gradient(135deg, #1e3a5f, #0f3460)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '13px',
                                    letterSpacing: '0.5px',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                {loading
                                    ? <><span className="spinner-border spinner-border-sm me-2">
                                        </span>Creating account...</>
                                    : <><i className="bi bi-person-check me-2"></i>Create Account</>
                                }
                            </button>
                        </div>

                        {/* Login link */}
                        <p className="text-center text-muted small mb-0 mt-2">
                            Already have an account?{" "}
                            <Link to="/login"
                                className="fw-medium text-decoration-none"
                                style={{ color: '#1e3a5f' }}>
                                Sign in
                            </Link>
                        </p>

                    </form>
                </div>

                {/* Footer */}
                <div className="text-center py-3"
                    style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0',
                        fontSize: '12px', color: '#94a3b8' }}>
                    <i className="bi bi-shield-lock me-1"></i>
                    Secured registration &nbsp;|&nbsp; RetailIQ &copy; {new Date().getFullYear()}
                </div>

            </div>
        </div>
    );
}