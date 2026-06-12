import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function UserHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">User Management</span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createUser">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllUser">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findUserById">Find By ID</Link>
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
