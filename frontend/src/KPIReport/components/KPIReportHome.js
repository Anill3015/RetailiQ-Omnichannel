import {Link, Outlet} from 'react-router'
export default function KPIReportHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createKPIReport">Add KPIReport</Link>
                    </li>
                    <li>
                        <Link to="deleteKPIReport">Delete KPIReport</Link>
                    </li>
                    <li>
                        <Link to="findKPIReport">Find KPIReport</Link>
                    </li>
                    <li>
                        <Link to="findKPIReport">Find KPIReport</Link>
                    </li>
                    <li>
                        <Link to="updateKPIReport">Update KPIReport</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}