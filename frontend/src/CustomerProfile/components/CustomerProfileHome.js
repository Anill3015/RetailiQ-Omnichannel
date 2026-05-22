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
                        <Link to="deleteCustomerProfile">Delete CustomerProfile</Link>
                    </li>
                    <li>
                        <Link to="findCustomerProfile">Find CustomerProfile</Link>
                    </li>
                    <li>
                        <Link to="updateCustomerProfile">Update CustomerProfile</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}