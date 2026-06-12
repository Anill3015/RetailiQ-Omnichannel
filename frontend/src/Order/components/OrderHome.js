import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "createOrder",
    label: "Add",
    desc: "Create Order",
    icon: "bi-plus-lg",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    to: "findOrder",
    label: "Find All",
    desc: "View all orders",
    icon: "bi-list-ul",
    color: "#10b981",
    bg: "#ecfdf5",
  },
];

export default function OrderHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("username") || "User";

  const isRoot =
    location.pathname === "/Order" ||
    location.pathname === "/Order/";

  const activeSegment = location.pathname.split("/").pop();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      
      {/* ✅ Navbar */}
      <nav
        className="sticky-top shadow"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Title */}
        <div style={{ color: "#fff", fontWeight: 700 }}>
          Orders
        </div>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {/* Home */}
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#fff",
            }}
          >
            <i className="bi bi-house-fill"></i>
          </button>

          {/* User */}
          <div style={{ color: "#fff", fontSize: 12 }}>
            {userName}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 6,
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Body */}
      <div className="container-fluid px-4 py-4">
        <h3>Order Management</h3>
        <p style={{ color: "#64748b" }}>
          Manage orders
        </p>

        {/* ✅ Cards */}
        <div className="row g-3 mb-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSegment === item.to;

            return (
              <div key={item.to} className="col-6 col-md-3">
                <Link to={item.to}>
                  <div
                    className="card border"
                    style={{
                      borderRadius: 12,
                      borderColor: isActive ? item.color : "#e2e8f0",
                      background: isActive ? item.bg : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <div className="card-body text-center">
                      <i
                        className={`bi ${item.icon}`}
                        style={{ fontSize: 20, color: item.color }}
                      ></i>

                      <div style={{ fontWeight: 600, marginTop: 8 }}>
                        {item.label}
                      </div>

                      <small style={{ color: "#64748b" }}>
                        {item.desc}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ✅ Content Area */}
        <div className="card shadow-sm">
          <div className="card-body">
            {isRoot ? (
              <div style={{ textAlign: "center", padding: 30 }}>
                <p>Select an option above</p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
