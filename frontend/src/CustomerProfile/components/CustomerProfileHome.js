import {Link, Outlet} from 'react-router'
export default function CustomerProfileHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createCustomerProfile">Add CustomerProfile</Link>
                    </li>
                    <li>
                        <Link to="findCustomerProfile">Find CustomerProfile</Link>
                    </li>
                    <li>
                        <Link to="findCustomerProfileById">Find CustomerProfile by ID</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}