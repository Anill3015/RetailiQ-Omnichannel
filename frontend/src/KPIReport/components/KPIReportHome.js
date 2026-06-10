import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function KPIReportHome() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>

            <nav className="navbar bg-dark px-3">

                <span className="navbar-brand text-white">
                    KPI Dashboard
                </span>

                <ul className="nav">

                    {/* ✅ BACK TO MAIN DASHBOARD */}
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            Home
                        </Link>
                    </li>

                    {/* ✅ KPI DASHBOARD PAGE */}
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="dashboard">
                            KPI Dashboard
                        </Link>
                    </li>

                    {/* ✅ LOGOUT */}
                    <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>

        </div>
    );
}