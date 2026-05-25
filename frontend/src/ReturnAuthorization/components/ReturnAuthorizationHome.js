import {Link, Outlet} from 'react-router'
export default function ReturnAuthorizationHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createReturnAuthorization">Add ReturnAuthorization</Link>
                    </li>
                    <li>
                        <Link to="findReturnAuthorizationById">Find ReturnAuthorization By Id</Link>
                    </li>
                    <li>
                        <Link to="updateReturnAuthorization">Update ReturnAuthorization</Link>
                    </li>
                    <li>
                        <Link to="deleteReturnAuthorization">Delete ReturnAuthorization</Link>
                    </li>
                    <li>
                        <Link to="findAllReturnAuthorization">Find All ReturnAuthorization</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}