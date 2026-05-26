import { Link, Outlet } from 'react-router';

export default function ForecastHome() {
    return (
        <div>
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