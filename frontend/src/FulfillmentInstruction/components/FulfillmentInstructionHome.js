import {Link, Outlet, useNavigate} from 'react-router'

import { FaHome } from "react-icons/fa";


export default function FulfillmentInstructionHome(){
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <nav style={{ display: "flex", gap: "20px", padding: "10px" }} className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className='container-fluid'>
                    
<Link to="/Dashboard" style={{ fontSize: "22px" }}>
        <FaHome />
      </Link>

                    <Link to="/FulfillmentInstruction" className="navbar-brand">Fulfillment Instructions</Link>
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
       <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="createFulfillmentInstruction">Add FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="deleteFulfillmentInstruction">Delete FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="findFulfillmentInstruction">Find FulfillmentInstruction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="updateFulfillmentInstruction">Update FulfillmentInstruction</Link>
 
                    </li>
                    <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                   
                </ul>
                </div>
                </div>
            </nav>
                <Outlet />
        </div>
    )
}