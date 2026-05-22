import {Link, Outlet} from 'react-router'
export default function InventoryHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createInventory">Add Inventory</Link>
                    </li>
                    <li>
                        <Link to="deleteInventory">Delete Inventory</Link>
                    </li>
                    <li>
                        <Link to="findInventory">Find Inventory</Link>
                    </li>
                    <li>
                        <Link to="updateInventory">Update Inventory</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}