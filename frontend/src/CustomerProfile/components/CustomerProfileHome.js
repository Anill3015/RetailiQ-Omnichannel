import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function CustomerProfileHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">

                {/* ✅ Clickable Title */}
                <Link className="navbar-brand text-white text-decoration-none" to="/dashboard">
                    RetailIQ
                </Link>

                <ul className="nav">

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createCustomerProfile">
                            Add
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findCustomerProfile">
                            Find
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findCustomerProfileById">
                            Find By ID
                        </Link>
                    </li>

                    {/* ✅ Logout styled same as ExceptionEvent */}
                    <li className="nav-item">
                        <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={logout}
                        >
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
