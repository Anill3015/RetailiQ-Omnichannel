import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ROLE_ACCESS = {
    ADMIN: [
        'forecast', 'auditlog', 'customerprofile', 'exceptionevent',
        'fulfillment', 'integration',  'inventoryavailability',
        'inventoryposition', 'kpi', 'location', 'notification', 'order',
        'pricelist', 'product', 'promotion', 'promotiontype', 'recommendation',
        'replenishment', 'returnauth', 'role', 'user','pendingUsers'
    ],
    STORE_ASSOCIATE:        ['customerprofile', 'inventoryavailability', 'notification', 'order', 'product'],
    ECOMMERCE_MANAGER:      ['product', 'promotion', 'promotiontype', 'pricelist', 'recommendation', 'forecast', 'kpi', 'notification'],
    INVENTORY_PLANNER:      [ 'inventoryavailability', 'inventoryposition', 'replenishment', 'forecast', 'kpi', 'location', 'notification'],
    FULFILLMENT_MANAGER:    ['fulfillment', 'order', 'exceptionevent', 'returnauth', 'location', 'notification'],
    CUSTOMER_SERVICE_AGENT: ['customerprofile', 'order', 'exceptionevent', 'returnauth', 'notification'],
    MARKETING_MANAGER:      ['promotion', 'promotiontype', 'pricelist', 'recommendation', 'forecast', 'kpi', 'notification'],
};

const ALL_MODULES = [
    { key: 'forecast',              label: 'Forecast',               desc: 'Demand forecasting',       route: '/Forecast',               icon: 'bi-graph-up-arrow',        color: '#6366f1', bg: '#eef2ff', section: 'Analytics' },
    { key: 'kpi',                   label: 'KPI Reports',            desc: 'View KPI analytics',       route: '/KPIReport',              icon: 'bi-bar-chart-line-fill',   color: '#10b981', bg: '#ecfdf5', section: 'Analytics' },
    { key: 'recommendation',        label: 'Recommendations',        desc: 'AI recommendations',       route: '/Recommendation',         icon: 'bi-stars',                 color: '#8b5cf6', bg: '#f5f3ff', section: 'Analytics' },
    { key: 'product',               label: 'Products',               desc: 'Product catalog',          route: '/Product',                icon: 'bi-box-seam-fill',         color: '#3b82f6', bg: '#eff6ff', section: 'Operations' },
    { key: 'inventoryavailability', label: 'Inv. Availability',      desc: 'Real-time availability',   route: '/InventoryAvailability',  icon: 'bi-check-circle-fill',     color: '#f59e0b', bg: '#fffbeb', section: 'Operations' },
    { key: 'inventoryposition',     label: 'Inv. Position',          desc: 'Stock positions',          route: '/InventoryPosition',      icon: 'bi-pin-map-fill',          color: '#f59e0b', bg: '#fffbeb', section: 'Operations' },
    { key: 'replenishment',         label: 'Replenishment',          desc: 'Replenishment plans',      route: '/Replenishment',          icon: 'bi-arrow-repeat',          color: '#10b981', bg: '#ecfdf5', section: 'Operations' },
    { key: 'order',                 label: 'Orders',                 desc: 'Order tracking',           route: '/Order',                  icon: 'bi-cart-check-fill',       color: '#10b981', bg: '#ecfdf5', section: 'Operations' },
    { key: 'location',              label: 'Locations',              desc: 'Store locations',          route: '/Location',               icon: 'bi-geo-alt-fill',          color: '#3b82f6', bg: '#eff6ff', section: 'Operations' },
    { key: 'customerprofile',       label: 'Customers',              desc: 'Customer profiles',        route: '/CustomerProfile',        icon: 'bi-person-lines-fill',     color: '#ef4444', bg: '#fef2f2', section: 'Customer & Service' },
    { key: 'exceptionevent',        label: 'Exceptions',             desc: 'Exception handling',       route: '/ExceptionEvent',         icon: 'bi-exclamation-circle-fill',color: '#ef4444', bg: '#fef2f2', section: 'Customer & Service' },
    { key: 'returnauth',            label: 'Returns',                desc: 'Return authorizations',    route: '/ReturnAuthorization',    icon: 'bi-arrow-counterclockwise',color: '#ef4444', bg: '#fef2f2', section: 'Customer & Service' },
    { key: 'promotion',             label: 'Promotions',             desc: 'Campaign management',      route: '/Promotion',              icon: 'bi-megaphone-fill',        color: '#ec4899', bg: '#fdf2f8', section: 'Marketing' },
    { key: 'promotiontype',         label: 'Promo Types',            desc: 'Promotion categories',     route: '/PromotionType',          icon: 'bi-bookmark-star-fill',    color: '#ec4899', bg: '#fdf2f8', section: 'Marketing' },
    { key: 'pricelist',             label: 'Price Lists',            desc: 'Pricing management',       route: '/PriceList',              icon: 'bi-tag-fill',              color: '#ec4899', bg: '#fdf2f8', section: 'Marketing' },
    { key: 'fulfillment',           label: 'Fulfillment',            desc: 'Order fulfillment',        route: '/FulfillmentInstruction', icon: 'bi-truck-flatbed',         color: '#10b981', bg: '#ecfdf5', section: 'Fulfillment' },
    { key: 'user',                  label: 'Users',                  desc: 'User management',          route: '/User',                   icon: 'bi-people-fill',           color: '#64748b', bg: '#f8fafc', section: 'Admin' },
    { key: 'role',                  label: 'Roles',                  desc: 'Role management',          route: '/Role',                   icon: 'bi-shield-fill-check',     color: '#64748b', bg: '#f8fafc', section: 'Admin' },
    { key: 'auditlog',              label: 'Audit Logs',             desc: 'Action history',           route: '/AuditLog',               icon: 'bi-journal-bookmark-fill', color: '#10b981', bg: '#ecfdf5', section: 'Admin' },
    { key: 'integration',           label: 'Integrations',           desc: 'API integrations',         route: '/IntegrationEndpoint',    icon: 'bi-plug-fill',             color: '#64748b', bg: '#f8fafc', section: 'Admin' },
    
    {
        key: 'pendingUsers',
        label: 'User Approvals',
        route: '/pendingUsers',
        icon: 'bi-person-check-fill',
        color: '#64748b', bg: '#f8fafc',
        section: 'Admin'
    },

    { key: 'notification',          label: 'Notifications',          desc: 'System alerts',            route: '/Notification',           icon: 'bi-bell-fill',             color: '#3b82f6', bg: '#eff6ff', section: 'System' },
];

const SECTIONS = ['Analytics', 'Operations', 'Customer & Service', 'Marketing', 'Fulfillment', 'Admin', 'System'];

const SECTION_META = {
    'Analytics':          { icon: 'bi-graph-up',          color: '#6366f1', bg: '#eef2ff' },
    'Operations':         { icon: 'bi-gear-fill',          color: '#f59e0b', bg: '#fffbeb' },
    'Customer & Service': { icon: 'bi-headset',            color: '#ef4444', bg: '#fef2f2' },
    'Marketing':          { icon: 'bi-megaphone-fill',     color: '#ec4899', bg: '#fdf2f8' },
    'Fulfillment':        { icon: 'bi-truck-fill',         color: '#10b981', bg: '#ecfdf5' },
    'Admin':              { icon: 'bi-shield-fill-check',  color: '#64748b', bg: '#f8fafc' },
    'System':             { icon: 'bi-bell-fill',          color: '#3b82f6', bg: '#eff6ff' },
};

const ROLE_LABELS = {
    ADMIN:                  { label: 'Administrator',       icon: 'bi-shield-fill-check', color: '#6366f1' },
    STORE_ASSOCIATE:        { label: 'Store Associate',     icon: 'bi-shop',              color: '#3b82f6' },
    ECOMMERCE_MANAGER:      { label: 'Ecommerce Manager',   icon: 'bi-bag-fill',          color: '#ec4899' },
    INVENTORY_PLANNER:      { label: 'Inventory Planner',   icon: 'bi-archive-fill',      color: '#f59e0b' },
    FULFILLMENT_MANAGER:    { label: 'Fulfillment Manager', icon: 'bi-truck-fill',        color: '#10b981' },
    CUSTOMER_SERVICE_AGENT: { label: 'Customer Service',    icon: 'bi-headset',           color: '#ef4444' },
    MARKETING_MANAGER:      { label: 'Marketing Manager',   icon: 'bi-megaphone-fill',    color: '#ec4899' },
};

export default function Dashboard() {
    const navigate = useNavigate();
    const role     = localStorage.getItem('role')     || '';
    const userName = localStorage.getItem('username') || 'User';
    const allowed  = ROLE_ACCESS[role] || [];
    const roleInfo = ROLE_LABELS[role] || { label: role, icon: 'bi-person-fill', color: '#64748b' };
    const [search, setSearch] = useState('');

    const greeting = () => {
        const h = new Date().getHours();
        return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
    };

    const filteredItems = (items) =>
        items.filter(m => m.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-vh-100" style={{ background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

            {/* ── Navbar ── */}
            <nav className="navbar sticky-top px-4 py-0 shadow"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)',
                    height: 64
                }}>
                {/* Logo */}
                <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: 40, height: 40,
                            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                            boxShadow: '0 0 0 3px rgba(99,102,241,0.25)'
                        }}>
                        <i className="bi bi-shop-window text-white" style={{ fontSize: 18 }}></i>
                    </div>
                    <div>
                        <div className="text-white fw-bold lh-1" style={{ fontSize: 15, letterSpacing: '-0.3px' }}>
                            RetailIQ
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '1.5px' }}>
                            OMNICHANNEL
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="position-relative" style={{ width: 260 }}>
                    <i className="bi bi-search position-absolute"
                        style={{ left: 12, top: '50%', transform: 'translateY(-50%)',
                            color: 'rgba(255,255,255,0.4)', fontSize: 13 }}></i>
                    <input
                        type="text"
                        className="form-control form-control-sm ps-4"
                        placeholder="Search modules..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 10, color: 'white', fontSize: 13,
                            boxShadow: 'none'
                        }}
                    />
                </div>

                {/* User */}
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                        style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
                            style={{
                                width: 32, height: 32, fontSize: 14,
                                background: `linear-gradient(135deg, ${roleInfo.color}, ${roleInfo.color}99)`
                            }}>
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-white fw-semibold lh-1" style={{ fontSize: 13 }}>{userName}</div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>{roleInfo.label}</div>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm d-flex align-items-center gap-2"
                        style={{
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#fca5a5', fontSize: 12, borderRadius: 10
                        }}
                        onClick={() => { localStorage.clear(); navigate('/login'); }}>
                        <i className="bi bi-box-arrow-right"></i> Sign Out
                    </button>
                </div>
            </nav>

            <div className="container-fluid px-4 py-4">

                {/* ── Hero Banner ── */}
                <div className="rounded-4 p-4 mb-4 position-relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e40af 100%)' }}>

                    {/* Decorative blobs */}
                    <div className="position-absolute rounded-circle"
                        style={{ width: 200, height: 200, top: -60, right: -40,
                            background: 'rgba(99,102,241,0.12)' }}></div>
                    <div className="position-absolute rounded-circle"
                        style={{ width: 140, height: 140, bottom: -50, right: 100,
                            background: 'rgba(59,130,246,0.1)' }}></div>

                    <div className="d-flex justify-content-between align-items-center position-relative">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="badge rounded-pill px-3 py-2"
                                    style={{ background: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>
                                    <i className={`bi ${roleInfo.icon} me-1`}
                                        style={{ color: roleInfo.color }}></i>
                                    {roleInfo.label}
                                </span>
                            </div>
                            <h3 className="text-white fw-bold mb-1" style={{ fontSize: 26, letterSpacing: '-0.5px' }}>
                                {greeting()}, {userName}! 👋
                            </h3>
                            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                                You have access to&nbsp;
                                <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{allowed.length}</strong>
                                &nbsp;of {ALL_MODULES.length} modules today.
                            </p>
                        </div>
                        <div className="text-center px-4 py-3 rounded-3"
                            style={{ background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10,
                                textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                            <div className="text-white fw-bold" style={{ fontSize: 24, letterSpacing: '-0.5px' }}>
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
                                {new Date().getFullYear()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Stats ── */}
                <div className="row g-3 mb-4">
                    {[
                        { label: 'Total Modules',  value: ALL_MODULES.length,              icon: 'bi-grid-3x3-gap-fill', color: '#6366f1', bg: '#eef2ff' },
                        { label: 'Accessible',     value: allowed.length,                  icon: 'bi-unlock-fill',       color: '#10b981', bg: '#ecfdf5' },
                        { label: 'Restricted',     value: ALL_MODULES.length-allowed.length,icon: 'bi-lock-fill',        color: '#ef4444', bg: '#fef2f2' },
                        { label: 'Your Role',      value: roleInfo.label,                  icon: roleInfo.icon,          color: roleInfo.color, bg: '#f8fafc' },
                    ].map((s, i) => (
                        <div key={i} className="col-md-3">
                            <div className="card border-0 shadow-sm h-100"
                                style={{ borderRadius: 16 }}>
                                <div className="card-body d-flex align-items-center gap-3 py-3">
                                    <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                                        style={{ width: 50, height: 50, background: s.bg }}>
                                        <i className={`bi ${s.icon}`} style={{ fontSize: 22, color: s.color }}></i>
                                    </div>
                                    <div>
                                        <div className="text-muted" style={{ fontSize: 11,
                                            textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 500 }}>
                                            {s.label}
                                        </div>
                                        <div className="fw-bold" style={{ fontSize: 20,
                                            color: '#0f172a', letterSpacing: '-0.5px' }}>
                                            {s.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Module Sections ── */}
                {SECTIONS.map(section => {
                    const raw   = ALL_MODULES.filter(m => m.section === section);
                    const items = filteredItems(raw);
                    if (!items.length) return null;

                    const hasAccess = raw.some(m => allowed.includes(m.key));
                    if (!hasAccess && role !== 'ADMIN') return null;

                    const accessCount = items.filter(m => allowed.includes(m.key)).length;
                    const meta = SECTION_META[section];

                    return (
                        <div key={section} className="card border-0 shadow-sm mb-4"
                            style={{ borderRadius: 18 }}>
                            <div className="card-body p-4">

                                {/* Section Header */}
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center justify-content-center rounded-3"
                                            style={{ width: 38, height: 38, background: meta.bg }}>
                                            <i className={`bi ${meta.icon}`}
                                                style={{ fontSize: 17, color: meta.color }}></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold" style={{ fontSize: 15, color: '#0f172a' }}>
                                                {section}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: 11 }}>
                                                {accessCount} of {items.length} modules accessible
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge rounded-pill px-3 py-2"
                                        style={{
                                            background: accessCount === items.length ? '#ecfdf5' : '#f8fafc',
                                            color: accessCount === items.length ? '#10b981' : '#64748b',
                                            border: `1px solid ${accessCount === items.length ? '#6ee7b7' : '#e2e8f0'}`,
                                            fontSize: 11, fontWeight: 600
                                        }}>
                                        {accessCount}/{items.length} accessible
                                    </span>
                                </div>

                                {/* Module Cards */}
                                <div className="row g-3">
                                    {items.map(m => {
                                        const isAllowed = allowed.includes(m.key);
                                        return (
                                            <div key={m.key} className="col-6 col-md-3 col-lg-2">
                                                <div
                                                    className="card border h-100"
                                                    style={{
                                                        borderRadius: 14,
                                                        cursor: isAllowed ? 'pointer' : 'not-allowed',
                                                        opacity: isAllowed ? 1 : 0.45,
                                                        transition: 'all 0.2s ease',
                                                        borderColor: '#e2e8f0',
                                                        overflow: 'hidden'
                                                    }}
                                                    onClick={() => isAllowed && navigate(m.route)}
                                                    onMouseEnter={e => {
                                                        if (isAllowed) {
                                                            e.currentTarget.style.borderColor = m.color;
                                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                                            e.currentTarget.style.boxShadow = `0 8px 24px ${m.color}30`;
                                                            e.currentTarget.style.background = m.bg;
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (isAllowed) {
                                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                            e.currentTarget.style.background = 'white';
                                                        }
                                                    }}
                                                >
                                                    {/* Top accent */}
                                                    {isAllowed && (
                                                        <div style={{
                                                            height: 3,
                                                            background: m.color,
                                                            borderRadius: '14px 14px 0 0'
                                                        }}></div>
                                                    )}

                                                    <div className="card-body p-3">
                                                        {/* Icon */}
                                                        <div className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                                                            style={{
                                                                width: 42, height: 42,
                                                                background: isAllowed ? m.bg : '#f1f5f9'
                                                            }}>
                                                            <i className={`bi ${m.icon}`}
                                                                style={{ fontSize: 19,
                                                                    color: isAllowed ? m.color : '#cbd5e1' }}></i>
                                                        </div>

                                                        {/* Label */}
                                                        <div className="fw-bold mb-1"
                                                            style={{ fontSize: 12,
                                                                color: isAllowed ? '#0f172a' : '#94a3b8',
                                                                letterSpacing: '-0.2px' }}>
                                                            {m.label}
                                                        </div>

                                                        {/* Desc */}
                                                        <div className="text-muted" style={{ fontSize: 10, lineHeight: 1.4 }}>
                                                            {isAllowed ? m.desc : '🔒 No access'}
                                                        </div>

                                                        {/* Status */}
                                                        {isAllowed && (
                                                            <div className="d-flex align-items-center gap-1 mt-2">
                                                                <div className="rounded-circle bg-success"
                                                                    style={{ width: 5, height: 5 }}></div>
                                                                <span className="text-success"
                                                                    style={{ fontSize: 10, fontWeight: 600 }}>
                                                                    Active
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}