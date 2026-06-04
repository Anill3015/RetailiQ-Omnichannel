import { Link, Outlet } from 'react-router-dom';

export default function CustomerProfileHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Customer Profile
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createCustomerProfile">
                            Add
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findCustomerProfile">Find CustomerProfile</Link>
                    </li>
                    <li>
                        <Link to="findCustomerProfileById">Find CustomerProfile by ID</Link>
=======
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findCustomerProfile">
                            Find
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findCustomerProfileById">
                            Find By ID
                        </Link>
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