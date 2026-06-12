import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function IntegrationEndpointHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Integration Endpoint
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createIntegrationEndpoint">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findIntegrationEndpointById">
                            Find By ID
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllIntegrationEndpoint">
                            Find All
                        </Link>
                    </li>
                    <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}