import { Link, Outlet } from 'react-router-dom';

export default function UserHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="createUser">Add User</Link></li>
                    <li><Link to="findAllUser">All Users</Link></li>
                    <li><Link to="findUserById">Find User By ID</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}