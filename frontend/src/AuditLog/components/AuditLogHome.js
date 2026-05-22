import {Link, Outlet} from 'react-router'
export default function AuditLogHome(){

    return (
        <div>
            <nav>
                <ul>
                    
                    <li>
                        <Link to="findAuditLog">Find AuditLog</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}