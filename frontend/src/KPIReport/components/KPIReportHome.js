import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
    { to: "dashboard", label: "KPI Dashboard", desc: "View metrics", icon: "bi-bar-chart-fill", color: "#6366f1", bg: "#eef2ff" },
];

export default function KPIReportHome() {
    const navigate = useNavigate();
    const location = useLocation();

    const userName = localStorage.getItem("username") || "User";
    const role = localStorage.getItem("role") || "";

    const isRoot =
        location.pathname === "/KPIReport" ||
        location.pathname === "/KPIReport/";

    const activeSegment = location.pathname.split("/").pop();

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

            {/* ✅ NAVBAR */}
            <nav
                className="sticky-top shadow"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)",
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
                        <i className="bi bi-speedometer2" style={{ color: "#fff" }}></i>
                    </div>
                    <div>
                        <div style={{ color: "#fff", fontWeight: 700 }}>KPI Dashboard</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>ANALYTICS</div>
                    </div>
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

                    {/* Home */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
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
                            background: "rgba(255,255,255,0.07)",
                            padding: "6px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                background: "#6366f1",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                            }}
                        >
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontSize: 13 }}>{userName}</div>
                            <div style={{ color: "#ccc", fontSize: 10 }}>{role}</div>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        style={{
                            background: "rgba(239,68,68,0.2)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            color: "#fca5a5",
                            borderRadius: 10,
                            padding: "6px 12px",
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* ✅ BODY */}
            <div className="container-fluid px-4 py-4">

                <h1 style={{ fontSize: 22, fontWeight: 700 }}>KPI Management</h1>
                <p style={{ fontSize: 13, color: "#64748b" }}>
                    Monitor business metrics and performance indicators
                </p>

                {/* ✅ CARDS */}
                <div className="row g-3 mb-4">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSegment === item.to;

                        return (
                            <div key={item.to} className="col-6 col-md-4 col-lg-3">
                                <Link to={item.to} style={{ textDecoration: "none" }}>
                                    <div
                                        className="card"
                                        style={{
                                            borderRadius: 14,
                                            border: isActive ? "2px solid #6366f1" : "1px solid #e2e8f0",
                                            background: isActive ? item.bg : "#fff",
                                            transition: "0.2s",
                                        }}
                                    >
                                        <div className="card-body">
                                            <i
                                                className={`bi ${item.icon}`}
                                                style={{ fontSize: 20, color: item.color }}
                                            ></i>

                                            <h6 style={{ marginTop: 10 }}>{item.label}</h6>
                                            <p style={{ fontSize: 12, color: "#64748b" }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* ✅ CONTENT */}
                <div className="card shadow-sm" style={{ borderRadius: 16 }}>
                    <div className="card-body">
                        {isRoot ? (
                            <div style={{ textAlign: "center", padding: 40 }}>
                                <i
                                    className="bi bi-bar-chart"
                                    style={{ fontSize: 30, color: "#6366f1" }}
                                ></i>
                                <h5 className="mt-3">Welcome to KPI Dashboard</h5>
                                <p>Select dashboard to view reports</p>
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