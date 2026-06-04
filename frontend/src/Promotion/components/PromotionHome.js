import { Link, Outlet } from 'react-router-dom';

export default function PromotionHome() {
    return (
        <div>
<<<<<<< HEAD
            <nav>
                <ul>
                   <li><Link to="createPromotion">Add Promotion</Link></li>
                    <li><Link to="findPromotion">All Promotions</Link></li>
                    <li><Link to="findPromotionById">Find Promotion By ID</Link></li>
=======
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Promotions</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createPromotion">Add</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotion">Find All</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotionById">Find By ID</Link>
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