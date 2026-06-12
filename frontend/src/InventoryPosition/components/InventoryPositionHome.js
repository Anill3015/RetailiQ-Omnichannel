import { Link, Outlet, useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";

export default function InventoryPositionHome() {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          
          <div className="d-flex align-items-center gap-3">
            <Link to="/Dashboard" className="text-white fs-4">
              <FaHome />
            </Link>

            <Link to="/InventoryPosition" className="navbar-brand mb-0">
              InventoryPosition
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            <ul className="navbar-nav align-items-center gap-3">
              
              <li className="nav-item">
                <Link className="nav-link" to="createInventoryPosition">
                  Add Inventory
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="findInventoryPosition">
                  Find Inventory
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}