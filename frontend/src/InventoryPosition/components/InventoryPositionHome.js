import {Link, Outlet} from 'react-router'
export default function InventoryPositionHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createInventoryPosition">Add InventoryPosition</Link>
                    </li>
                    <li>
                        <Link to="deleteInventoryPosition">Delete InventoryPosition</Link>
                    </li>
                    <li>
                        <Link to="findInventoryPosition">Find InventoryPosition</Link>
                    </li>
                    <li>
                        <Link to="findInventoryPositionById">Find InventoryPositionById</Link>
                    </li>
                    <li>
                        <Link to="updateInventoryPosition">Update InventoryPosition</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}