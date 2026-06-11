import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const STATUS_BADGE = {
    CREATED:    'badge bg-warning text-dark',
    APPROVED:   'badge bg-primary',
    IN_TRANSIT: 'badge bg-secondary',
    COMPLETED:  'badge bg-success',
    REJECTED:   'badge bg-danger',
};

function PlannerKPIs({ forecasts, orders }) {
    const totalForecastQty = forecasts.reduce((s, f) => s + (f.forecastQty || 0), 0);
    const totalSafetyStock = forecasts.reduce((s, f) => s + Math.ceil((f.forecastQty || 0) * 0.2), 0);
    const pendingOrders    = orders.filter(o => o.status === 'CREATED').length;
    const inTransitQty     = orders.filter(o => o.status === 'IN_TRANSIT').reduce((s, o) => s + (o.quantity || 0), 0);
    const completedOrders  = orders.filter(o => o.status === 'COMPLETED').length;
    const rejectedOrders   = orders.filter(o => o.status === 'REJECTED').length;

    const kpis = [
        { label: 'Total Forecast Vol.', value: totalForecastQty.toLocaleString(), sub: 'units', bg: 'primary' },
        { label: 'Safety Stock Total',  value: totalSafetyStock.toLocaleString(),  sub: 'units', bg: 'info' },
        { label: 'Pending Orders',      value: pendingOrders,                      sub: 'orders', bg: 'warning' },
        { label: 'Units In Transit',    value: inTransitQty.toLocaleString(),      sub: 'units', bg: 'secondary' },
        { label: 'Completed Orders',    value: completedOrders,                    sub: '',      bg: 'success' },
        { label: 'Rejected Orders',     value: rejectedOrders,                     sub: '',      bg: 'danger' },
    ];

    return (
        <div className="row g-3 mb-4">
            {kpis.map(({ label, value, sub, bg }) => (
                <div key={label} className="col-6 col-md-4 col-lg-2">
                    <div className={`card border-0 bg-${bg} bg-opacity-10 h-100`}>
                        <div className="card-body py-3 px-3">
                            <p className="text-muted fw-semibold mb-1" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>
                                {label}
                            </p>
                            <p className={`fw-bold mb-0 text-${bg === 'warning' ? 'dark' : bg}`} style={{ fontSize: 22 }}>
                                {value}
                            </p>
                            {sub && <p className="text-muted mb-0" style={{ fontSize: 11 }}>{sub}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ForecastTableTab({ forecasts, search }) {
    const filtered = forecasts.filter(f => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return f.product?.sku?.toLowerCase().includes(q) ||
               f.period?.includes(q) ||
               String(f.forecastId).includes(q);
    });

    const riskBadge = (qty) => {
        if (qty < 50)  return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">Low Volume</span>;
        if (qty < 200) return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">Medium</span>;
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">High Volume</span>;
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Demand Forecasts with Safety Stock</span>
                <Link to="/Forecast/createForecast" className="btn btn-outline-primary btn-sm">+ Add Forecast</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>SKU</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>LOCATION</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>PERIOD</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>FORECAST QTY</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>SAFETY STOCK (20%)</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>REPLENISH AT (30%)</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>VOLUME RISK</th>
                            <th className="text-muted fw-semibold" style={{ fontSize: 12 }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5 text-muted">No forecasts match your search.</td>
                            </tr>
                        ) : filtered.map(f => {
                            const safetyStock  = Math.ceil((f.forecastQty || 0) * 0.2);
                            const replenishAt  = Math.ceil((f.forecastQty || 0) * 0.3);
                            return (
                                <tr key={f.forecastId}>
                                    <td><code className="fw-semibold text-dark">{f.product?.sku}</code></td>
                                    <td>
                                        <span className="badge bg-secondary bg-opacity-10 text-secondary border">
                                            Loc {f.location?.locationId}
                                        </span>
                                    </td>
                                    <td className="fw-semibold">{f.period}</td>
                                    <td><span className="fw-bold">{f.forecastQty?.toLocaleString()}</span></td>
                                    <td>
                                        <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25">
                                            {safetyStock.toLocaleString()} units
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-warning fw-semibold" style={{ fontSize: 13 }}>
                                            ≤ {replenishAt.toLocaleString()} units
                                        </span>
                                    </td>
                                    <td>{riskBadge(f.forecastQty || 0)}</td>
                                    <td>
                                        <Link to={`/Forecast/updateForecast/${f.forecastId}`}
                                            className="btn btn-outline-warning btn-sm">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PipelineTab({ orders, search }) {
    const STAGES = ['CREATED', 'APPROVED', 'IN_TRANSIT', 'COMPLETED', 'REJECTED'];
    const STAGE_LABEL = {
        CREATED: 'Pending', APPROVED: 'Approved',
        IN_TRANSIT: 'In Transit', COMPLETED: 'Done', REJECTED: 'Rejected'
    };
    const STAGE_STYLE = {
        CREATED:    { bg: 'bg-warning bg-opacity-10', border: 'border-warning', text: 'text-warning' },
        APPROVED:   { bg: 'bg-primary bg-opacity-10', border: 'border-primary', text: 'text-primary' },
        IN_TRANSIT: { bg: 'bg-info bg-opacity-10',    border: 'border-info',    text: 'text-info' },
        COMPLETED:  { bg: 'bg-success bg-opacity-10', border: 'border-success', text: 'text-success' },
        REJECTED:   { bg: 'bg-danger bg-opacity-10',  border: 'border-danger',  text: 'text-danger' },
    };

    const filtered = orders.filter(o => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return o.product?.sku?.toLowerCase().includes(q) || String(o.replenishmentId).includes(q);
    });

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Replenishment Pipeline</span>
                <Link to="/Replenishment/createReplenishment" className="btn btn-outline-primary btn-sm">+ Order</Link>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {STAGES.map(stage => {
                        const lane = filtered.filter(o => o.status === stage);
                        const { bg, border, text } = STAGE_STYLE[stage];
                        return (
                            <div key={stage} className="col">
                                <div className={`rounded p-2 mb-2 ${bg} border ${border} text-center`}>
                                    <span className={`fw-semibold ${text}`} style={{ fontSize: 12 }}>
                                        {STAGE_LABEL[stage]} ({lane.length})
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    {lane.length === 0 ? (
                                        <div className="border border-dashed rounded p-3 text-center text-muted" style={{ fontSize: 12 }}>
                                            Empty
                                        </div>
                                    ) : lane.map(o => (
                                        <div key={o.replenishmentId} className="card border shadow-none">
                                            <div className="card-body p-2">
                                                <code className="fw-semibold d-block" style={{ fontSize: 11 }}>{o.product?.sku}</code>
                                                <p className="text-muted mb-1" style={{ fontSize: 10 }}>
                                                    {o.quantity?.toLocaleString()} u · {o.fromLocation?.locationId}→{o.toLocation?.locationId}
                                                </p>
                                                <Link
                                                    to={`/Replenishment/updateReplenishment/${o.replenishmentId}`}
                                                    className="text-primary text-decoration-none"
                                                    style={{ fontSize: 11 }}
                                                >
                                                    Update →
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function SafetyStockTuner({ forecasts }) {
    const [multiplier, setMultiplier] = useState(20);
    const previewTotal = forecasts.reduce((s, f) => s + Math.ceil((f.forecastQty || 0) * multiplier / 100), 0);
    const defaultTotal = forecasts.reduce((s, f) => s + Math.ceil((f.forecastQty || 0) * 0.2), 0);
    const diff = previewTotal - defaultTotal;

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-semibold">
                ⚙ Safety Stock Tuner
            </div>
            <div className="card-body">
                <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                    Model what-if scenarios for safety stock by adjusting the buffer rate. The backend uses 20% by default.
                </p>
                <div className="d-flex align-items-center gap-3 mb-3">
                    <label className="fw-semibold mb-0" style={{ minWidth: 120, fontSize: 14 }}>
                        Buffer rate: <span className="text-primary">{multiplier}%</span>
                    </label>
                    <input
                        type="range"
                        className="form-range flex-grow-1"
                        min={5} max={50} step={1}
                        value={multiplier}
                        onChange={e => setMultiplier(Number(e.target.value))}
                    />
                </div>
                <div className="alert alert-info mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p className="fw-semibold mb-0">Projected total safety stock</p>
                            <p className="mb-0" style={{ fontSize: 24, fontWeight: 700 }}>
                                {previewTotal.toLocaleString()} units
                            </p>
                        </div>
                        <div className="text-end">
                            <p className="mb-0 text-muted" style={{ fontSize: 12 }}>vs default 20%</p>
                            <span className={`badge ${diff > 0 ? 'bg-warning text-dark' : diff < 0 ? 'bg-success' : 'bg-secondary'}`}>
                                {diff > 0 ? `+${diff.toLocaleString()} extra` : diff < 0 ? `${diff.toLocaleString()} less` : 'Same as default'}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                    Planning tool only. To change actual safety stock, update the forecast quantity.
                </p>
            </div>
        </div>
    );
}

function TransferSuggestions({ forecasts, orders }) {
    const highDemandSkus = forecasts
        .filter(f => (f.forecastQty || 0) >= 200)
        .map(f => ({ sku: f.product?.sku, forecastQty: f.forecastQty, period: f.period }));

    const activeSkus = new Set(
        orders.filter(o => ['CREATED', 'APPROVED', 'IN_TRANSIT'].includes(o.status))
              .map(o => o.product?.sku)
    );

    const suggestions = highDemandSkus.filter(item => !activeSkus.has(item.sku));

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-semibold">
                💡 Transfer Suggestions
            </div>
            <div className="card-body">
                <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                    High-demand SKUs (≥ 200 units forecast) with no active replenishment order.
                </p>
                {suggestions.length === 0 ? (
                    <div className="alert alert-success mb-0">
                        <strong>✓ All clear!</strong> All high-demand SKUs have active replenishment orders.
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-2">
                        {suggestions.slice(0, 5).map((item, i) => (
                            <div key={i} className="alert alert-warning d-flex justify-content-between align-items-center mb-0 py-2">
                                <div>
                                    <code className="fw-bold">{item.sku}</code>
                                    <p className="mb-0" style={{ fontSize: 12 }}>
                                        {item.forecastQty?.toLocaleString()} units · {item.period}
                                    </p>
                                </div>
                                <Link to="/Replenishment/createReplenishment" className="btn btn-warning btn-sm text-dark fw-semibold">
                                    Create Order
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function OverviewTab({ forecasts, orders }) {
    const STATUS_COLORS = {
        CREATED: '#ffc107', APPROVED: '#0d6efd',
        IN_TRANSIT: '#6c757d', COMPLETED: '#198754', REJECTED: '#dc3545'
    };

    return (
        <div className="row g-4">
            {/* Recent Forecasts */}
            <div className="col-md-6">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white fw-semibold">Recent Forecasts</div>
                    <ul className="list-group list-group-flush">
                        {forecasts.slice(0, 6).map(f => (
                            <li key={f.forecastId} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <code className="fw-semibold text-dark">{f.product?.sku}</code>
                                    <p className="text-muted mb-0" style={{ fontSize: 11 }}>{f.period} · Loc {f.location?.locationId}</p>
                                </div>
                                <div className="text-end">
                                    <span className="fw-bold">{f.forecastQty?.toLocaleString()}</span>
                                    <p className="text-info mb-0" style={{ fontSize: 11 }}>
                                        SS: {Math.ceil((f.forecastQty || 0) * 0.2).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                        <li className="list-group-item">
                            <Link to="/Forecast/findForecast" className="small text-primary text-decoration-none">
                                View all {forecasts.length} forecasts →
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Order Status Breakdown */}
            <div className="col-md-6">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white fw-semibold">Order Status Breakdown</div>
                    <div className="card-body">
                        {['CREATED', 'APPROVED', 'IN_TRANSIT', 'COMPLETED', 'REJECTED'].map(status => {
                            const count = orders.filter(o => o.status === status).length;
                            const pct = orders.length > 0 ? Math.round(count / orders.length * 100) : 0;
                            return (
                                <div key={status} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold" style={{ fontSize: 13 }}>{status}</span>
                                        <span className="text-muted" style={{ fontSize: 13 }}>{count} ({pct}%)</span>
                                    </div>
                                    <div className="progress" style={{ height: 8 }}>
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${pct}%`,
                                                backgroundColor: STATUS_COLORS[status],
                                                transition: 'width 0.4s'
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <Link to="/Replenishment/findReplenishment" className="small text-primary text-decoration-none">
                            View all {orders.length} orders →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="col-12">
                <TransferSuggestions forecasts={forecasts} orders={orders} />
            </div>
        </div>
    );
}

export default function InventoryPlannerDashboard() {
    const navigate = useNavigate();
    const [forecasts, setForecasts] = useState([]);
    const [orders, setOrders]       = useState([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const token = localStorage.getItem('token');
        Promise.all([
            axios.get('http://localhost:9011/api/forecast/fetchAll',      { headers: { Authorization: `Bearer ${token}` } }),
            axios.get('http://localhost:9011/api/replenishment/fetchAll', { headers: { Authorization: `Bearer ${token}` } })
        ])
        .then(([fRes, rRes]) => {
            setForecasts(fRes.data || []);
            setOrders(rRes.data || []);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    const TABS = [
        { id: 'overview',  label: 'Overview' },
        { id: 'forecasts', label: 'Forecasts' },
        { id: 'pipeline',  label: 'Pipeline' },
        { id: 'tools',     label: 'Planning Tools' },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <nav className="navbar navbar-dark bg-dark px-3 shadow-sm">
                <Link className="navbar-brand fw-bold text-decoration-none me-4" to="/dashboard">
                    <span className="text-warning">Retail</span>IQ
                </Link>
                <span className="navbar-text text-white-50 me-auto">Inventory Planner</span>
                <div className="d-flex gap-2 align-items-center">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search SKU or ID…"
                        style={{ width: 200 }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => { localStorage.clear(); navigate('/login'); }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container-lg py-4">
                <div className="mb-4">
                    <h4 className="fw-bold mb-0">Inventory Planner Dashboard</h4>
                    <p className="text-muted mb-0" style={{ fontSize: 14 }}>
                        Forecast analysis · safety stock tuning · replenishment management
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" />
                        <p className="text-muted">Loading inventory data…</p>
                    </div>
                ) : (
                    <>
                        <PlannerKPIs forecasts={forecasts} orders={orders} />

                        {/* Tab Bar */}
                        <ul className="nav nav-tabs mb-4">
                            {TABS.map(tab => (
                                <li key={tab.id} className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === tab.id ? 'active fw-semibold' : 'text-muted'}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {activeTab === 'overview' && (
                            <OverviewTab forecasts={forecasts} orders={orders} />
                        )}
                        {activeTab === 'forecasts' && (
                            <ForecastTableTab forecasts={forecasts} search={search} />
                        )}
                        {activeTab === 'pipeline' && (
                            <PipelineTab orders={orders} search={search} />
                        )}
                        {activeTab === 'tools' && (
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <SafetyStockTuner forecasts={forecasts} />
                                </div>
                                <div className="col-md-6">
                                    <TransferSuggestions forecasts={forecasts} orders={orders} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}