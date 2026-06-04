import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function KPIReportHome() {
    const navigate = useNavigate();
 
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand text-white">
                    KPI Reports
                </span>

                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="createKPIReport">
                            Add
                        </Link>
                    </li>
<<<<<<< HEAD
                    <li>
                        <Link to="findKPIReportById">Find KPIReport By Id</Link>
                    </li>
                    <li>
                        <Link to="findAllKPIReport">Find All KPIReport</Link>
                    </li>
                    <li>
                        <Link to="updateKPIReport">Update KPIReport</Link>
 
                    </li>
                   
=======
                    
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findKPIReportById">
                            Find By Id
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="findAllKPIReport">
                            Find All 
                        </Link>
                    </li>
                    <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
>>>>>>> Rakesh
                </ul>
            </nav>

            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
}
