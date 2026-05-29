import {Link, Outlet} from 'react-router'
export default function FulfillmentInstructionHome(){

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                    <Link to="/FulfillmentInstruction" className="navbar-brand">Fulfillment Instructions</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="createFulfillmentInstruction">Add FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="deleteFulfillmentInstruction">Delete FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="findFulfillmentInstruction">Find FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="updateFulfillmentInstruction">Update FulfillmentInstruction</Link>
 
                    </li>
                   
                </ul>
                </div>
            </nav>
                <Outlet />
        </div>
    )
}