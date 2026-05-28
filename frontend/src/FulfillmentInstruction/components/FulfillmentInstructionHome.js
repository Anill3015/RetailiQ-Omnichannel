import {Link, Outlet} from 'react-router'
export default function FulfillmentInstructionHome(){

    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">Fulfillment Instructions</span>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="createFulfillmentInstruction">Add FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="deleteFulfillmentInstruction">Delete FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="findFulfillmentInstruction">Find FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="updateFulfillmentInstruction">Update FulfillmentInstruction</Link>
 
                    </li>
                   
                </ul>
            </nav>
          <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    )
}