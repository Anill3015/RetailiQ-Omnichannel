import {Link, Outlet} from 'react-router'
export default function FulfillmentInstructionHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createFulfillmentInstruction">Add FulfillmentInstruction</Link>
                    </li>
                    <li>
                        <Link to="deleteFulfillmentInstruction">Delete FulfillmentInstruction</Link>
                    </li>
                    <li>
                        <Link to="findFulfillmentInstruction">Find FulfillmentInstruction</Link>
                    </li>
                    <li>
                        <Link to="updateFulfillmentInstruction">Update FulfillmentInstruction</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}