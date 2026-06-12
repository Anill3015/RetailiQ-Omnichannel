import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PendingUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username") || "User";
    const role = localStorage.getItem("role") || "";

    const fetchUsers = () => {
        axios.get("http://localhost:9011/user/pending", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUsers(res.data))
        .catch(console.error);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const approve = (id) => {
        axios.put(`http://localhost:9011/user/approve/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchUsers);
    };

    const reject = (id) => {
        axios.put(`http://localhost:9011/user/reject/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(fetchUsers);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

            <nav className="sticky-top shadow" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)',
                height: 64, display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', padding: '0 24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                        boxShadow: '0 0 0 3px rgba(99,102,241,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <i className="bi bi-shop-window" style={{ color: '#fff', fontSize: 18 }}></i>
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.1 }}>RetailIQ</div>
                        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9, letterSpacing: '1.5px', fontWeight: 600 }}>OMNICHANNEL</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate('/dashboard')} title="Go to Dashboard"
                        style={{
                            width: 36, height: 36, borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'transparent', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontSize: 16,
                        }}>
                        <i className="bi bi-house-fill"></i>
                    </button>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10, padding: '6px 12px',
                    }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #6366f199)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 13, fontWeight: 700,
                        }}>
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>{userName}</div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>{role || 'User'}</div>
                        </div>
                    </div>

                    <button onClick={() => { localStorage.clear(); navigate('/login'); }}
                        style={{
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#fca5a5', fontSize: 12, borderRadius: 10,
                            padding: '6px 14px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                        <i className="bi bi-box-arrow-right"></i> Sign Out
                    </button>
                </div>
            </nav>

            <div className="container-fluid px-4 py-4">
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.4px' }}>
                    Pending Users
                </h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px' }}>
                    Review and approve or reject pending registrations
                </p>

                <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
                    <div className="card-body p-4">
                        {users.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
                                <div style={{ width: 60, height: 60, borderRadius: 18, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <i className="bi bi-person-check-fill" style={{ fontSize: 26, color: '#10b981' }}></i>
                                </div>
                                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>No Pending Users</h2>
                                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>All registrations have been reviewed</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.userId}>
                                                <td>{u.name}</td>
                                                <td>{u.username}</td>
                                                <td>{u.role?.name}</td>
                                                <td>
                                                    <button className="btn btn-success btn-sm me-2"
                                                        onClick={() => approve(u.userId)}>
                                                        <i className="bi bi-check-circle me-1"></i>Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-sm"
                                                        onClick={() => reject(u.userId)}>
                                                        <i className="bi bi-x-circle me-1"></i>Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}