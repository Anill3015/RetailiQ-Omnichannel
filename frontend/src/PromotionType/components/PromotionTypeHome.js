import { Link, Outlet } from 'react-router-dom';

export default function PromotionTypeHome() {
    return (
        <div>
<<<<<<< HEAD
            <nav>
                <ul>
                    <li><Link to="createPromotionType">Add Promotion Type</Link></li>
                    <li><Link to="findPromotionType">All Promotion Types</Link></li>
=======
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Promotion Types</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createPromotionType">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotionType">Find All</Link>
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