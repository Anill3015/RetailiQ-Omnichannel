import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindAllUser() {
    const [userArr, setUserArr] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("ALL");

    const fetchUsers = () => {
        axios.get("http://localhost:9011/user/fetchAll")
            .then(res => setUserArr(res.data))
            .catch(err => setError("Error: " + err.message));
    };

    useEffect(() => { fetchUsers(); }, []);

    const approve = (id) => {
        axios.put(`http://localhost:9011/user/approve/${id}`)
            .then(() => { alert("User approved!"); fetchUsers(); })
            .catch(err => alert("Error: " + err.message));
    };

    const reject = (id) => {
        axios.put(`http://localhost:9011/user/reject/${id}`)
            .then(() => { alert("User rejected!"); fetchUsers(); })
            .catch(err => alert("Error: " + err.message));
    };

    const roleBadge = (role) => {
        const colors = {
            ADMIN: 'danger', STORE_ASSOCIATE: 'primary',
            ECOMMERCE_MANAGER: 'success', INVENTORY_PLANNER: 'warning',
            FULFILLMENT_MANAGER: 'info', CUSTOMER_SERVICE_AGENT: 'secondary',
            MARKETING_MANAGER: 'dark'
        };
        return colors[role] || 'secondary';
    };

    const statusBadge = (status) => {
        if (status === 'APPROVED') return 'success';
        if (status === 'PENDING')  return 'warning';
        if (status === 'REJECTED') return 'danger';
        return 'secondary';
    };

    const filtered = userArr.filter(u => {
        const matchSearch =
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.username?.toLowerCase().includes(search.toLowerCase()) ||
            u.role?.name?.toLowerCase().includes(search.toLowerCase());
        if (activeTab === "ALL")      return matchSearch;
        if (activeTab === "PENDING")  return matchSearch && u.status === "PENDING";
        if (activeTab === "APPROVED") return matchSearch && u.status === "APPROVED";
        if (activeTab === "REJECTED") return matchSearch && u.status === "REJECTED";
        return matchSearch;
    });

    const pendingCount = userArr.filter(u => u.status === "PENDING").length;

    return (
        <div className="container-fluid mt-2">
            <div className="card border-0 shadow-sm">

                {/* Header */}
                <div className="card-header py-3 d-flex justify-content-between align-items-center"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f3460)' }}>
                    <div className="d-flex align-items-center gap-3">
                        <h5 className="text-white mb-0">
                            <i className="bi bi-people-fill me-2"></i>User Management
                        </h5>
                        {pendingCount > 0 && (
                            <span className="badge bg-warning text-dark rounded-pill">
                                {pendingCount} pending approval
                            </span>
                        )}
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="input-group input-group-sm" style={{ width: 220 }}>
                            <span className="input-group-text bg-white border-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input type="text" className="form-control border-0"
                                placeholder="Search users..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <Link to="/User/createUser" className="btn btn-sm btn-light d-flex align-items-center gap-1">
                            <i className="bi bi-person-plus-fill"></i> Add User
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-4 pt-3 border-bottom">
                    <ul className="nav nav-tabs border-0">
                        {['ALL', 'APPROVED', 'PENDING', 'REJECTED'].map(tab => (
                            <li key={tab} className="nav-item">
                                <button
                                    className={`nav-link border-0 fw-semibold ${activeTab === tab
                                        ? 'active text-primary' : 'text-muted'}`}
                                    style={{ fontSize: 13 }}
                                    onClick={() => setActiveTab(tab)}>
                                    {tab}
                                    <span className={`ms-1 badge rounded-pill ${tab === 'PENDING'
                                        ? 'bg-warning text-dark' : 'bg-light text-dark'}`}
                                        style={{ fontSize: 10 }}>
                                        {tab === 'ALL'
                                            ? userArr.length
                                            : userArr.filter(u => u.status === tab).length}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Table */}
                <div className="card-body p-0">
                    {error && <div className="alert alert-danger m-3">{error}</div>}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th className="ps-4" style={{ fontSize: 12, color: '#64748b' }}>USER</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>USERNAME</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>EMAIL</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>PHONE</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>ROLE</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>STATUS</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }} className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                                            No users found
                                        </td>
                                    </tr>
                                ) : filtered.map(u => (
                                    <tr key={u.userId}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0"
                                                    style={{ width: 36, height: 36, fontSize: 14,
                                                        background: 'linear-gradient(135deg, #1e3a5f, #0f3460)' }}>
                                                    {u.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold" style={{ fontSize: 13 }}>{u.name}</div>
                                                    <div className="text-muted" style={{ fontSize: 11 }}>ID: {u.userId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-muted" style={{ fontSize: 13 }}>
                                            <i className="bi bi-at me-1"></i>{u.username}
                                        </td>
                                        <td style={{ fontSize: 13 }}>
                                            <i className="bi bi-envelope me-1 text-muted"></i>{u.email}
                                        </td>
                                        <td style={{ fontSize: 13 }}>
                                            <i className="bi bi-telephone me-1 text-muted"></i>{u.phone}
                                        </td>
                                        <td>
                                            <span className={`badge bg-${roleBadge(u.role?.name)} rounded-pill px-2`}
                                                style={{ fontSize: 10 }}>
                                                {u.role?.name?.replace(/_/g, ' ') || 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge bg-${statusBadge(u.status)} bg-opacity-10 text-${statusBadge(u.status)} border border-${statusBadge(u.status)} rounded-pill px-2`}
                                                style={{ fontSize: 11 }}>
                                                <i className={`bi ${u.status === 'APPROVED'
                                                    ? 'bi-check-circle'
                                                    : u.status === 'PENDING'
                                                    ? 'bi-clock'
                                                    : 'bi-x-circle'} me-1`}></i>
                                                {u.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex gap-1 justify-content-center flex-wrap">
                                                {u.status === 'PENDING' && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-success d-flex align-items-center gap-1"
                                                            style={{ fontSize: 11 }}
                                                            onClick={() => approve(u.userId)}>
                                                            <i className="bi bi-check-lg"></i> Approve
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                                            style={{ fontSize: 11 }}
                                                            onClick={() => reject(u.userId)}>
                                                            <i className="bi bi-x-lg"></i> Reject
                                                        </button>
                                                    </>
                                                )}
                                                <Link to={`/User/editUser/${u.userId}`}
                                                    className="btn btn-sm btn-outline-warning"
                                                    style={{ fontSize: 11 }}>
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <Link to={`/User/deleteUser/${u.userId}`}
                                                    className="btn btn-sm btn-outline-danger"
                                                    style={{ fontSize: 11 }}>
                                                    <i className="bi bi-trash"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-top d-flex justify-content-between align-items-center"
                        style={{ background: '#f8fafc' }}>
                        <span className="text-muted" style={{ fontSize: 12 }}>
                            Showing {filtered.length} of {userArr.length} users
                        </span>
                        <div className="d-flex gap-3" style={{ fontSize: 12 }}>
                            <span className="text-success">
                                <i className="bi bi-check-circle me-1"></i>
                                {userArr.filter(u => u.status === 'APPROVED').length} Approved
                            </span>
                            <span className="text-warning">
                                <i className="bi bi-clock me-1"></i>
                                {userArr.filter(u => u.status === 'PENDING').length} Pending
                            </span>
                            <span className="text-danger">
                                <i className="bi bi-x-circle me-1"></i>
                                {userArr.filter(u => u.status === 'REJECTED').length} Rejected
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}