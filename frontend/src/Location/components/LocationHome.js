import { Link, Outlet } from 'react-router';

export default function LocationHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="createLocation">Add Location</Link></li>
                    <li><Link to="findLocation">Find All Locations</Link></li>
                    <li><Link to="findLocationById">Find Location By ID</Link></li>
                    <li><Link to="updateLocation">Update Location</Link></li>
                    <li><Link to="deleteLocation">Delete Location</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}