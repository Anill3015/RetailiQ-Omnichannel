import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function PromotionHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Promotion</span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createPromotion">Add Promotion</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotionById">Find Promotion</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotion">Find All</Link>
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
