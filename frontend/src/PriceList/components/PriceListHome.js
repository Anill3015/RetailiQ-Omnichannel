import { Link, Outlet } from 'react-router-dom';

export default function PriceListHome() {
    return (
        <div>
<<<<<<< HEAD
            <nav>
                <ul>
                   <li><Link to="createPriceList">Add PriceList</Link></li>
                    <li><Link to="findPriceList">All PriceLists</Link></li>
                    <li><Link to="findPriceListById">Find PriceList By ID</Link></li>
=======
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
>>>>>>> Rakesh
                </ul>
            </nav>
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}