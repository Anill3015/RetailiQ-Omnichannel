import {Link, Outlet} from 'react-router'
export default function ReplenishmentHome(){

    return (
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="createReplenishment">Add Replenishment</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="findReplenishment">Find Replenishment</Link>
                    </li>
                     <li className="nav-item">
                        <Link to="findReplenishmentById">Find Replenishment by ID</Link>
                    </li>
                </ul>
                </div>

            </nav>
            <Outlet></Outlet>
        </div>
    )
}