import { Link, Outlet } from 'react-router-dom';

export default function UserHome() {
    return (
        <div>
            <nav className="navbar navbar-default navbar-static-top">
                <div>
                <ul className="nav navbar-nav">
                    <li><Link to="createUser">Add User</Link></li>
                    <li><Link to="findAllUser">All Users</Link></li>
                    <li><Link to="findUserById">Find User By ID</Link></li>
                </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}