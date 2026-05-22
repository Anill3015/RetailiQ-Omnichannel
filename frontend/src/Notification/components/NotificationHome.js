import {Link, Outlet} from 'react-router'
export default function NotificationHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createNotification">Add Notification</Link>
                    </li>
                    <li>
                        <Link to="deleteNotification">Delete Notification</Link>
                    </li>
                    <li>
                        <Link to="findNotification">Find Notification</Link>
                    </li>
                    <li>
                        <Link to="updateNotification">Update Notification</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}