import { Link, Outlet } from 'react-router-dom';

export default function RoleHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Roles</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createRole">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllRole">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findRoleById">Find By ID</Link>
                    </li>
                </ul>
            </nav>
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}