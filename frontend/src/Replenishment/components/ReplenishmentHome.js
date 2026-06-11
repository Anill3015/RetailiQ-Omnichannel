import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function ReplenishmentHome() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">

                <Link className="navbar-brand text-white text-decoration-none" to="/dashboard">
                    Replenishment Orders
                </Link>

                <ul className="nav">

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createReplenishment">
                            Add
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findReplenishment">
                            Find All
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findReplenishmentById">
                            Find By ID
                        </Link>
                    </li>

                    {/* ✅ New Feature Link */}
                    <li className="nav-item">
                        <Link className="nav-link text-warning" to="generateReplenishment">
                            Generate from Forecast
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button className="btn btn-danger btn-sm ms-2" onClick={logout}>
                            Logout
                        </button>
                    </li>

                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}