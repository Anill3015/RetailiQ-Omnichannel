import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function ExceptionEventHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Exception Events
                </span>

                <ul className="nav align-items-center">

                    {/* ✅ HOME BUTTON */}
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createExceptionEvent">
                            Add
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findExceptionEventById">Find ExceptionEvent By ID</Link>
=======

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findExceptionEventById">
                            Find By ID
                        </Link>
>>>>>>> Rakesh
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllExceptionEvent">
                            Find All
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findAllExceptionEvent">FindAll ExceptionEvent</Link>
=======

                    <li className="nav-item ms-3">
                        <button className="btn btn-danger btn-sm" onClick={logout}>
                            Logout
                        </button>
>>>>>>> Rakesh
                    </li>
                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}