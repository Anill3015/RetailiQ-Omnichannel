import { Link, Outlet } from 'react-router';

export default function LocationHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
             <Link to="/Location" className="navbar-brand">Location</Link>
            
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="createLocation">Add Location</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findLocation">Find All Locations</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findLocationById">Find Location By ID</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="updateLocation">Update Location</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="deleteLocation">Delete Location</Link></li>
                </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}