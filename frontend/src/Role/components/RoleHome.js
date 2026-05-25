import {Link, Outlet} from 'react-router'
export default function RoleHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="createRole">Add Role</Link></li>
                    <li><Link to="findAllRole">All Roles</Link></li>
                    <li><Link to="findRoleById">Find Role By ID</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}