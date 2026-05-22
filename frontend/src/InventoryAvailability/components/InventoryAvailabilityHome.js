
import {Link, Outlet} from 'react-router'
export default function InventoryAvailabilityHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createInventoryAvailability">Add InventoryAvailability</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}