import {Link, Outlet, useNavigate} from 'react-router'
export default function InventoryPositionHome(){
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      
      <Link to="/InventoryPosition" className="navbar-brand">
        InventoryPosition
      </Link>

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
            <Link className="nav-link" to="createInventoryPosition">
              Add InventoryPosition
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="deleteInventoryPosition">
              Delete InventoryPosition
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="findInventoryPosition">
              Find InventoryPosition
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="findInventoryPositionById">
              Find InventoryPositionById
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="updateInventoryPosition">
              Update InventoryPosition
            </Link>
          </li>

        </ul>

        {/* Logout aligned right */}
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
        
      </div>
    </div>
  </nav>
</div>

            <Outlet></Outlet>
        </div>
       
    )
}