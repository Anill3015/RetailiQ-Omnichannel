import {Link, Outlet} from 'react-router'
export default function UserHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createUser">Add User</Link>
                    </li>
                    <li>
                        <Link to="findUser">Find User</Link>
                    </li>
                    <li>
                        <Link to="deleteUser">Delete User</Link>
                    </li>
                    <li>
                        <Link to="updateUser">Update User</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}