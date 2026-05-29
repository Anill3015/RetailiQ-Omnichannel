import { Link, Outlet } from 'react-router-dom';

export default function ForecastHome() {
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    Forecast
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createForecast">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findForecast">
                            Find All
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findForecastById">
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
