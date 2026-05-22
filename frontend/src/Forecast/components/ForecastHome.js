import {Link, Outlet} from 'react-router'
export default function ForecastHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createForecast">Add Forecast</Link>
                    </li>
                    <li>
                        <Link to="deleteForecast">Delete Forecast</Link>
                    </li>
                    <li>
                        <Link to="findForecast">Find Forecast</Link>
                    </li>
                    <li>
                        <Link to="updateForecast">Update Forecast</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}