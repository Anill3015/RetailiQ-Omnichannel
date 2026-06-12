import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { to: 'createPromotionType', label: 'Add',      desc: 'Create new type',  icon: 'bi-plus-lg', color: '#6366f1', bg: '#eef2ff' },
    { to: 'findPromotionType',   label: 'Find All', desc: 'View all types',   icon: 'bi-list-ul', color: '#10b981', bg: '#ecfdf5' },
];

const globalStyles = `
  .nh-card { transition: border-color 0.2s, background-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: pointer; text-decoration: none !important; }
  .nh-card:hover { transform: translateY(-4px); }
`;

export default function PromotionTypeHome() {
    const navigate = useNavigate();
    const location = useLocation();

    const role     = localStorage.getItem('role')     || '';
    const userName = localStorage.getItem('username') || 'User';
    const isRoot   = location.pathname === '/PromotionType' || location.pathname === '/PromotionType/';
    const activeSegment = location.pathname.split('/').pop();

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
            <style>{globalStyles}</style>

            <nav className="sticky-top shadow" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #3b82f6)', boxShadow: '0 0 0 3px rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-shop-window" style={{ color: '#fff', fontSize: 18 }}></i>
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.1 }}>RetailIQ</div>
                        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9, letterSpacing: '1.5px', fontWeight: 600 }}>OMNICHANNEL</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate('/dashboard')} title="Go to Dashboard" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontSize: 16 }}>
                        <i className="bi bi-house-fill"></i>
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '6px 12px' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #6366f199)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{userName.charAt(0).toUpperCase()}</div>
                        <div>
                            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>{userName}</div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>{role || 'User'}</div>
                        </div>
                    </div>
                    <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', fontSize: 12, borderRadius: 10, padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="bi bi-box-arrow-right"></i> Sign Out
                    </button>
                </div>
            </nav>

            <div className="container-fluid px-4 py-4">
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.4px' }}>Promotion Type</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px' }}>Manage promotion types · Categories · Classifications</p>

                <div className="row g-3 mb-4">
                    {NAV_ITEMS.map(item => {
                        const isActive = activeSegment === item.to;
                        return (
                            <div key={item.to} className="col-6 col-md-4 col-lg-2">
                                <Link to={item.to} style={{ textDecoration: 'none' }}>
                                    <div className="nh-card card border h-100"
                                        style={{ borderRadius: 14, borderColor: isActive ? item.color : '#e2e8f0', background: isActive ? item.bg : '#fff', boxShadow: isActive ? `0 8px 24px ${item.color}25` : 'none', overflow: 'hidden', position: 'relative' }}
                                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = item.bg; e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}30`; }}}
                                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = 'none'; }}}>
                                        <div style={{ height: 3, background: item.color, borderRadius: '14px 14px 0 0' }}></div>
                                        <div className="card-body p-3">
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                                                <i className={`bi ${item.icon}`} style={{ fontSize: 20, color: item.color }}></i>
                                            </div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{item.label}</div>
                                            <div style={{ fontSize: 10, color: '#64748b', lineHeight: 1.4 }}>{item.desc}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }}></div>
                                                <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
                    <div className="card-body p-4">
                        {isRoot ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
                                <div style={{ width: 60, height: 60, borderRadius: 18, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <i className="bi bi-collection-fill" style={{ fontSize: 26, color: '#6366f1' }}></i>
                                </div>
                                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>Welcome to Promotion Type</h2>
                                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Select an option above to continue</p>
                            </div>
                        ) : <Outlet />}
                    </div>
                </div>
            </div>
        </div>
    );
}