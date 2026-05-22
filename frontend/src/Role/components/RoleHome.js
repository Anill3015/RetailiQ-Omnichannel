import {Link, Outlet} from 'react-router'
export default function RoleHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createRole">Add Role</Link>
                    </li>
                    <li>
                        <Link to="findRole">Find Role</Link>
                    </li>
                    <li>
                        <Link to="deleteRole">Delete Role</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}