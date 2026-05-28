import { Link, Outlet } from 'react-router-dom';

export default function RecommendationHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Recommendation
                </span>

                <ul className="nav">
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
                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}
