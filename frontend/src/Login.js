import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let login = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:9011/loginapi/login", {
            "username": username,
            "password": password
        })
        .then((res) => {
            localStorage.setItem("token",    res.data.token);
            localStorage.setItem("role",     res.data.role);
            localStorage.setItem("username", res.data.username);

            setSuccess("Login successful! Welcome " + res.data.username + " 🎉");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        })
        
        .catch((err) => {
        console.error(err);

        if (err.response && err.response.data) {

            if (typeof err.response.data === "string") {
                setError(err.response.data);
            } 
            else if (err.response.data.error) {
                setError(err.response.data.error);   // ✅ FIX HERE
            } 
            else if (err.response.data.message) {
                setError(err.response.data.message);
            } 
            else {
                setError("Login failed");
            }

        } else {
            setError("Login failed");
        }

        setLoading(false);
    });


    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>

            <div className="card border-0 shadow-lg"
                style={{ width: '100%', maxWidth: '440px', borderRadius: '20px', overflow: 'hidden' }}>

                {/* Header */}
                <div className="text-center py-5 px-4"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f3460)' }}>
                    <div className="mb-3">
                        <span className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow"
                            style={{ width: '68px', height: '68px' }}>
                            <i className="bi bi-shop-window"
                                style={{ fontSize: '30px', color: '#1e3a5f' }}></i>
                        </span>
                    </div>
                    <h3 className="text-white fw-bold mb-1 fs-4">RetailIQ</h3>
                    <p className="mb-0" style={{ color: '#a8c4e0', fontSize: '14px' }}>
                        Welcome back! Please sign in to continue.
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

                    <form onSubmit={login}>

                        {/* Username */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold"
                                style={{ fontSize: '12px', letterSpacing: '0.8px',
                                    textTransform: 'uppercase', color: '#64748b' }}>
                                Username
                            </label>
                            <div className="input-group">
                                <span className="input-group-text border-end-0"
                                    style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                                    <i className="bi bi-person" style={{ color: '#94a3b8' }}></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="Enter your username"
                                    value={username}
                                    style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                        background: '#f8fafc', color: '#1e293b' }}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError(""); setSuccess("");
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
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
                                    placeholder="Enter your password"
                                    value={password}
                                    style={{ borderColor: '#e2e8f0', boxShadow: 'none',
                                        background: '#f8fafc', color: '#1e293b' }}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(""); setSuccess("");
                                    }}
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

                        {/* Sign In Button */}
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
                                        </span>Signing in...</>
                                    : <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In</>
                                }
                            </button>
                        </div>

                        {/* ✅ Register link */}
                        <p className="text-center text-muted small mb-0 mt-2">
                            Don't have an account?{" "}
                            <Link to="/register"
                                className="fw-medium text-decoration-none"
                                style={{ color: '#1e3a5f' }}>
                                Register
                            </Link>
                        </p>

                    </form>
                </div>

                {/* Footer */}
                <div className="text-center py-3"
                    style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0',
                        fontSize: '12px', color: '#94a3b8' }}>
                    <i className="bi bi-shield-lock me-1"></i>
                    Secured login &nbsp;|&nbsp; RetailIQ &copy; {new Date().getFullYear()}
                </div>

            </div>
        </div>
    );
}
    