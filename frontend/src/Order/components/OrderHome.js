import { Link, Outlet , useNavigate} from 'react-router';

export default function OrderHome() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
             <Link to="/Order" className="navbar-brand">Orders</Link>
            
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="createOrder">Add Order</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findOrder">Find All Orders</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findOrderById">Find Order By ID</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="updateOrder">Update Order</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="deleteOrder">Delete Order</Link></li>
                     <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}