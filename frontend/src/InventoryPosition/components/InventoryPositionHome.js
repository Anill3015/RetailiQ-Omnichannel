import {Link, Outlet} from 'react-router'
export default function InventoryPositionHome(){

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                     <Link to="/InventoryPosition" className="navbar-brand">InventoryPosition</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="createInventoryPosition">Add InventoryPosition</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="deleteInventoryPosition">Delete InventoryPosition</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="findInventoryPosition">Find InventoryPosition</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="findInventoryPositionById">Find InventoryPositionById</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="updateInventoryPosition">Update InventoryPosition</Link>
 
                    </li>
                    
                </ul>
                </div>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}