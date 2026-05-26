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
                        <Link to="findNotificationById">Find NotificationById</Link>
                    </li>
                    <li>
                        <Link to="findAllNotification">FindAll Notification</Link>
 
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}