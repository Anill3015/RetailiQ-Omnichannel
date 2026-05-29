import { Link, Outlet } from 'react-router-dom';

export default function PriceListHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Price List</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createPriceList">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPriceList">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPriceListById">Find By ID</Link>
                    </li>
                </ul>
            </nav>
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}