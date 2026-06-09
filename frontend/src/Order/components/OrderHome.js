import { Link, Outlet , useNavigate} from 'react-router';
import { FaHome } from "react-icons/fa";

export default function OrderHome() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
       <div>
                   <nav style={{ display: "flex", gap: "20px", padding: "10px" }} className="navbar navbar-expand-lg navbar-dark bg-dark">
       
                       <div className='container-fluid'>
                           
<div className="d-flex align-items-center gap-3">

       <Link to="/Dashboard" style={{ fontSize: "22px" }}>
               <FaHome />
             </Link>
             <Link to="/Order" className="navbar-brand">Orders</Link>
             </div>
             <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
       

<div
  className="collapse navbar-collapse justify-content-end"
  id="navbarContent"
>
  <ul className="navbar-nav align-items-center gap-3">


                    <li className="nav-item"><Link className="nav-link" to="createOrder">Add Order</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findOrder">Find All Orders</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="findOrderById">Find Order By ID</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="updateOrder">Update Order</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="deleteOrder">Delete Order</Link></li>
                     <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                </ul>
                </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}