import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function ExceptionEventHome() {
    const navigate = useNavigate();
 
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Exception Events
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createExceptionEvent">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findExceptionEventById">
                            Find By ID
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllExceptionEvent">
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
