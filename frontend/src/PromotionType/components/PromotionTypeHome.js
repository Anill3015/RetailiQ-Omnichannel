import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function PromotionTypeHome() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Promotion Type</span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createPromotionType">Add Type</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findPromotionType">Find Type</Link>
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