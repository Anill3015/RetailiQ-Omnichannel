import {Link, Outlet} from 'react-router'
export default function ExceptionEventHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createExceptionEvent">Add ExceptionEvent</Link>
                    </li>
                    <li>
                        <Link to="deleteExceptionEvent">Delete ExceptionEvent</Link>
                    </li>
                    <li>
                        <Link to="findExceptionEvent">Find ExceptionEvent</Link>
                    </li>
                    <li>
                        <Link to="updateExceptionEvent">Update ExceptionEvent</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}