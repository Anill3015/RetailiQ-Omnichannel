import { Link, Outlet } from 'react-router-dom';

export default function ReplenishmentHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Replenishment
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createReplenishment">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findReplenishment">
                            Find
                        </Link>
                    </li>
<<<<<<< HEAD
                     <li>
                        <Link to="findReplenishmentById">Find Replenishment by ID</Link>
=======
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findReplenishmentById">
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