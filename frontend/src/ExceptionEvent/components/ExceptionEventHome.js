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
                        <Link to="findExceptionEventById">Find ExceptionEvent By ID</Link>
                    </li>
                    <li>
                        <Link to="updateExceptionEvent">Update ExceptionEvent</Link>
 
                    </li>
                    <li>
                        <Link to="findAllExceptionEvent">FindAll ExceptionEvent</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}