import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "createInventoryPosition",
    label: "Add",
    desc: "Create Inventory",
    icon: "bi-plus-lg",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    to: "findInventoryPosition",
    label: "Find",
    desc: "Inventory Records",
    icon: "bi-search",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const styles = `
  .fi-card {
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none !important;
  }
  .fi-card:hover {
    transform: translateY(-4px);
  }
`;

export default function InventoryPositionHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "";

  const isRoot =
    location.pathname === "/InventoryPosition" ||
    location.pathname === "/InventoryPosition/";

  const activeSegment = location.pathname.split("/").pop();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <style>{styles}</style>

      {/* ✅ Modern Navbar */}
      <nav
        className="sticky-top shadow"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="bi bi-box-seam" style={{ color: "#fff" }}></i>
          </div>

          <div>
            <div style={{ color: "#fff", fontWeight: 700 }}>
              Inventory Position
            </div>
          </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              padding: "6px 10px",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#6366f1",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>

            <div style={{ fontSize: 12, color: "#fff" }}>
              {userName}
              <div style={{ fontSize: 10, opacity: 0.7 }}>{role}</div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Page Body */}
      <div className="container-fluid px-4 py-4">
        <h2 style={{ fontWeight: 700 }}>Inventory Position</h2>
        <p style={{ color: "#64748b" }}>
          Manage inventory operations
        </p>

        {/* ✅ Cards Section */}
        <div className="row g-3 mb-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSegment === item.to;

            return (
              <div key={item.to} className="col-6 col-md-4 col-lg-2">
                <Link to={item.to}>
                  <div
                    className="fi-card card border h-100"
                    style={{
                      borderRadius: 14,
                      borderColor: isActive ? item.color : "#e2e8f0",
                      background: isActive ? item.bg : "#fff",
                    }}
                  >
                    <div
                      style={{
                        height: 3,
                        background: item.color,
                        borderRadius: "14px 14px 0 0",
                      }}
                    ></div>

                    <div className="card-body">
                      <div
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 10,
                          background: item.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 10,
                        }}
                      >
                        <i
                          className={`bi ${item.icon}`}
                          style={{ fontSize: 18, color: item.color }}
                        ></i>
                      </div>

                      <div style={{ fontWeight: 600 }}>{item.label}</div>

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
        <div className="card shadow-sm" style={{ borderRadius: 14 }}>
          <div className="card-body">
            {isRoot ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <h5>Welcome to Inventory Module</h5>
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