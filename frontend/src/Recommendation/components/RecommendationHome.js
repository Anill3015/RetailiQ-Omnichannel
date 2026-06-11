import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function RecommendationHome() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar bg-dark px-3">

                <Link className="navbar-brand text-white text-decoration-none" to="/dashboard">
                    Recommendation
                </Link>

                <ul className="nav">

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                             Home
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createRecommendation">
                            Add
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findRecommendation">
                            Find
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findRecommendationById">
                            Find By ID
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button className="btn btn-danger btn-sm ms-2" onClick={logout}>
                            Logout
                        </button>
                    </li>

                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}