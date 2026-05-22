import {Link, Outlet} from 'react-router'
export default function LocationHome(){

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="createLocation">Add Location</Link>
                    </li>
                    <li>
                        <Link to="deleteLocation">Delete Location</Link>
                    </li>
                    <li>
                        <Link to="findLocation">Find Location</Link>
                    </li>
                    <li>
                        <Link to="findLocation">Find Location</Link>
                    </li>
                    <li>
                        <Link to="updateLocation">Update Location</Link>
 
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}