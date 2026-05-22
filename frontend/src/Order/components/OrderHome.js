import {Link, Outlet} from 'react-router'
export default function OrderHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createOrder">Add Order</Link>
                    </li>
                    <li>
                        <Link to="deleteOrder">Delete Order</Link>
                    </li>
                    <li>
                        <Link to="findOrder">Find Order</Link>
                    </li>
                    <li>
                        <Link to="updateOrder">Update Order</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}