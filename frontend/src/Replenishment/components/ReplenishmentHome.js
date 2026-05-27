import {Link, Outlet} from 'react-router'
export default function ReplenishmentHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createReplenishment">Add Replenishment</Link>
                    </li>
                    <li>
                        <Link to="findReplenishment">Find Replenishment</Link>
                    </li>
                     <li>
                        <Link to="findReplenishmentById">Find Replenishment by ID</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}