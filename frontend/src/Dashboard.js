import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
// ─── Role to allowed modules mapping (matches your 7 roles from image) ──────────
const ROLE_ACCESS = {
    ADMIN: [
        'forecast', 'auditlog', 'customerprofile', 'exceptionevent',
        'fulfillment', 'integration', 'inventory', 'inventoryavailability',
        'inventoryposition', 'kpi', 'location', 'notification', 'order',
        'pricelist', 'product', 'promotion', 'promotiontype', 'recommendation',
        'replenishment', 'returnauth', 'role', 'user'
    ],
    STORE_ASSOCIATE: [
        'customerprofile', 'inventoryavailability', 'notification',
        'order', 'product'
    ],
    ECOMMERCE_MANAGER: [
        'product', 'promotion', 'promotiontype', 'pricelist',
        'recommendation', 'forecast', 'kpi', 'notification'
    ],
    INVENTORY_PLANNER: [
        'inventory', 'inventoryavailability', 'inventoryposition',
        'replenishment', 'forecast', 'kpi', 'location', 'notification'
    ],
    FULFILLMENT_MANAGER: [
        'fulfillment', 'order', 'exceptionevent', 'returnauth',
        'location', 'notification'
    ],
    CUSTOMER_SERVICE_AGENT: [
        'customerprofile', 'order', 'exceptionevent', 'returnauth', 'notification'
    ],
    MARKETING_MANAGER: [
        'promotion', 'promotiontype', 'pricelist', 'recommendation',
        'forecast', 'kpi', 'notification'
    ],
};
 
// ─── All modules with routes and metadata ───────────────────────────────────────
const ALL_MODULES = [
    // Analytics
    { key: 'forecast',             label: 'Forecast',              desc: 'Demand forecasting and planning',           route: '/Forecast',              icon: '◈', bg: '#EEEDFE', color: '#534AB7', section: 'Analytics' },
    { key: 'kpi',                  label: 'KPI Reports',           desc: 'Generate and view KPI analytics',           route: '/KPIReport',             icon: '◉', bg: '#EAF3DE', color: '#3B6D11', section: 'Analytics' },
    { key: 'recommendation',       label: 'Recommendations',       desc: 'AI-driven product recommendations',         route: '/Recommendation',        icon: '◬', bg: '#EEEDFE', color: '#534AB7', section: 'Analytics' },
 
    // Operations
    { key: 'product',              label: 'Products',              desc: 'Product catalog and pricing',               route: '/Product',               icon: '◧', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
    { key: 'inventory',            label: 'Inventory',             desc: 'Stock tracking and management',             route: '/Inventory',             icon: '▦', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'inventoryavailability',label: 'Inventory Availability',desc: 'Real-time stock availability',              route: '/InventoryAvailability', icon: '◱', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'inventoryposition',    label: 'Inventory Position',    desc: 'Stock position across locations',           route: '/InventoryPosition',     icon: '◳', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'replenishment',        label: 'Replenishment',         desc: 'Stock replenishment plans',                 route: '/Replenishment',         icon: '◫', bg: '#E1F5EE', color: '#0F6E56', section: 'Operations' },
    { key: 'order',                label: 'Orders',                desc: 'Order management and tracking',             route: '/Order',                 icon: '◪', bg: '#E1F5EE', color: '#0F6E56', section: 'Operations' },
    { key: 'location',             label: 'Locations',             desc: 'Store and warehouse locations',             route: '/Location',              icon: '◎', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
 
    // Customer & Service
    { key: 'customerprofile',      label: 'Customer Profiles',     desc: 'Customer data and purchase history',        route: '/CustomerProfile',       icon: '◑', bg: '#FAECE7', color: '#993C1D', section: 'Customer & Service' },
    { key: 'exceptionevent',       label: 'Exception Events',      desc: 'Handle order exceptions and issues',        route: '/ExceptionEvent',        icon: '◒', bg: '#FCEBEB', color: '#A32D2D', section: 'Customer & Service' },
    { key: 'returnauth',           label: 'Return Authorizations', desc: 'Process returns and refunds',               route: '/ReturnAuthorization',   icon: '◐', bg: '#FCEBEB', color: '#A32D2D', section: 'Customer & Service' },
 
    // Marketing
    { key: 'promotion',            label: 'Promotions',            desc: 'Campaign and discount management',          route: '/Promotion',             icon: '◨', bg: '#FBEAF0', color: '#993556', section: 'Marketing' },
    { key: 'promotiontype',        label: 'Promotion Types',       desc: 'Promotion category management',             route: '/PromotionType',         icon: '◷', bg: '#FBEAF0', color: '#993556', section: 'Marketing' },
    { key: 'pricelist',            label: 'Price Lists',           desc: 'Pricing rules and management',              route: '/PriceList',             icon: '◶', bg: '#FBEAF0', color: '#993556', section: 'Marketing' },
 
    // Fulfillment
    { key: 'fulfillment',          label: 'Fulfillment',           desc: 'Order routing and ship-from-store',         route: '/FulfillmentInstruction',icon: '◴', bg: '#E1F5EE', color: '#0F6E56', section: 'Fulfillment' },
 
    // Admin
    { key: 'user',                 label: 'Users',                 desc: 'User management and roles',                 route: '/User',                  icon: '◎', bg: '#F1EFE8', color: '#5F5E5A', section: 'Admin' },
    { key: 'role',                 label: 'Roles',                 desc: 'Role and permission management',            route: '/Role',                  icon: '◈', bg: '#F1EFE8', color: '#5F5E5A', section: 'Admin' },
    { key: 'auditlog',             label: 'Audit Logs',            desc: 'System and user action history',            route: '/AuditLog',              icon: '◷', bg: '#EAF3DE', color: '#3B6D11', section: 'Admin' },
    { key: 'integration',          label: 'Integration Endpoints', desc: 'External API integrations',                 route: '/IntegrationEndpoint',   icon: '◵', bg: '#F1EFE8', color: '#5F5E5A', section: 'Admin' },
 
    // System
    { key: 'notification',         label: 'Notifications',         desc: 'Alerts and system notifications',           route: '/Notification',          icon: '◬', bg: '#E6F1FB', color: '#185FA5', section: 'System' },
];
 
const SECTIONS = ['Analytics', 'Operations', 'Customer & Service', 'Marketing', 'Fulfillment', 'Admin', 'System'];
 
export default function Dashboard() {
    const navigate = useNavigate();
    const role     = localStorage.getItem('role')     || '';
    const userName = localStorage.getItem('username') || 'User';
    const allowed  = ROLE_ACCESS[role] || [];
 
    const [kpiReports,  setKpiReports]  = useState([]);
    const [compReports, setCompReports] = useState([]);
 
    useEffect(() => {
        if (allowed.includes('kpi')) {
            axios.get('http://localhost:8016/api/kpi-reports')
                .then(res => setKpiReports(res.data || []))
                .catch(() => {});
        }
    }, []);
 
    const activeKPI = kpiReports.filter(r => r.status === 'ACTIVE');
    const latest    = activeKPI[activeKPI.length - 1] || {};
 
    // Role-specific metrics
    const roleMetrics = {
        ADMIN: [
            { label: 'Total Modules',   value: ALL_MODULES.length,  color: '#185FA5' },
            { label: 'Your Access',     value: allowed.length,       color: '#3B6D11' },
            { label: 'System Status',   value: 'OK',                 color: '#3B6D11' },
        ],
        STORE_ASSOCIATE: [
            { label: 'Role',    value: 'Store Associate', color: '#185FA5' },
            { label: 'Access',  value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
        ECOMMERCE_MANAGER: [
            { label: 'Role',         value: 'Ecommerce Manager', color: '#185FA5' },
            { label: 'Sales Growth', value: latest.salesGrowth != null ? `+${latest.salesGrowth}%` : '—', color: '#3B6D11' },
            { label: 'Access',       value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
        INVENTORY_PLANNER: [
            { label: 'Role',           value: 'Inventory Planner', color: '#185FA5' },
            { label: 'Stock Turnover', value: latest.stockTurnover || '—', color: '#3B6D11' },
            { label: 'Access',         value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
        FULFILLMENT_MANAGER: [
            { label: 'Role',   value: 'Fulfillment Manager', color: '#185FA5' },
            { label: 'Access', value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
        CUSTOMER_SERVICE_AGENT: [
            { label: 'Role',   value: 'Customer Service', color: '#185FA5' },
            { label: 'Access', value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
        MARKETING_MANAGER: [
            { label: 'Role',   value: 'Marketing Manager', color: '#185FA5' },
            { label: 'Access', value: `${allowed.length} modules`, color: '#3B6D11' },
        ],
    };
    const metrics = roleMetrics[role] || [];
 
    const s = {
        page:    { fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh', padding: '24px' },
        card:    { background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '16px', marginBottom: '14px' },
        metric:  { background: '#f9fafb', borderRadius: '8px', padding: '12px' },
        modCard: (isAllowed) => ({
            background: isAllowed ? 'white' : '#f9fafb',
            border: `1px solid #f3f4f6`,
            borderRadius: '10px', padding: '14px',
            cursor: isAllowed ? 'pointer' : 'not-allowed',
            opacity: isAllowed ? 1 : 0.4,
            transition: 'border-color 0.15s',
        }),
        iconBox: (bg, color, isAllowed) => ({
            width: '32px', height: '32px', borderRadius: '8px',
            background: isAllowed ? bg : '#f3f4f6',
            color: isAllowed ? color : '#9ca3af',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '15px',
            marginBottom: '8px',
        }),
    };
 
    return (
        <div style={s.page}>
 
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                        Welcome, {userName}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        {role.replace(/_/g, ' ')} — {allowed.length} of {ALL_MODULES.length} modules accessible
                    </p>
                </div>
                <button
                    onClick={() => { localStorage.clear(); navigate('/login'); }}
                    style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
 
            {/* Metrics row */}
            {metrics.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${metrics.length}, 1fr)`, gap: '10px', marginBottom: '16px' }}>
                    {metrics.map((m, i) => (
                        <div key={i} style={s.metric}>
                            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{m.label}</div>
                            <div style={{ fontSize: '20px', fontWeight: 600, color: m.color || '#111827' }}>{m.value}</div>
                        </div>
                    ))}
                </div>
            )}
 
            {/* Module sections */}
            {SECTIONS.map(section => {
                const items = ALL_MODULES.filter(m => m.section === section);
                if (!items.length) return null;
 
                const hasAccess = items.some(m => allowed.includes(m.key));
                if (!hasAccess && role !== 'ADMIN') return null;
 
                return (
                    <div key={section} style={s.card}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{section}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>
                            {items.filter(m => allowed.includes(m.key)).length} of {items.length} modules accessible
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {items.map(m => {
                                const isAllowed = allowed.includes(m.key);
                                return (
                                    <div
                                        key={m.key}
                                        style={s.modCard(isAllowed)}
                                        onClick={() => isAllowed && navigate(m.route)}
                                        onMouseEnter={e => { if (isAllowed) e.currentTarget.style.borderColor = '#d1d5db'; }}
                                        onMouseLeave={e => { if (isAllowed) e.currentTarget.style.borderColor = '#f3f4f6'; }}
                                    >
                                        <div style={s.iconBox(m.bg, m.color, isAllowed)}>{m.icon}</div>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '3px' }}>{m.label}</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {isAllowed ? m.desc : 'No access — contact admin'}
                                        </div>
                                        {!isAllowed && (
                                            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>🔒 Restricted</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
 
        </div>
    );
}
 