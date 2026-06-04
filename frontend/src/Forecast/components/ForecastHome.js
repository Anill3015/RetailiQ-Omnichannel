<<<<<<< HEAD
import { Link, Outlet } from 'react-router';
=======
import { Link, Outlet } from 'react-router-dom';
>>>>>>> Rakesh

export default function ForecastHome() {
    return (
        <div>
<<<<<<< HEAD
            <nav>
                <ul>
                    <li><Link to="createForecast">Add Forecast</Link></li>
                    <li><Link to="findForecast">Find All Forecasts</Link></li>
                    <li><Link to="findForecastById">Find Forecast By ID</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
=======
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
>>>>>>> Rakesh
