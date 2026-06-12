import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: 'createFulfillmentInstruction', label: 'Add',  desc: 'Create instruction', icon: 'bi-plus-lg', color: '#6366f1', bg: '#eef2ff' },
  { to: 'findFulfillmentInstruction',   label: 'Find', desc: 'Search records',     icon: 'bi-search',  color: '#3b82f6', bg: '#eff6ff' },
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

export default function FulfillmentInstructionHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem('username') || 'User';
  const role     = localStorage.getItem('role') || '';

  const isRoot = location.pathname === '/FulfillmentInstruction' || location.pathname === '/FulfillmentInstruction/';
  const activeSegment = location.pathname.split('/').pop();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      
      <style>{styles}</style>

      <nav
        className="sticky-top"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <i className="bi bi-box-fill" style={{ color: '#fff' }}></i>
          </div>

          <div style={{ color: '#fff', fontWeight: 700 }}>
            Fulfillment
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              color: '#fff'
            }}
          >
            <i className="bi bi-house-fill"></i>
          </button>

          {/* User */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            padding: '6px 10px',
            borderRadius: 10
          }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: '50%',
              background: '#6366f1',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: '#fff' }}>
              {userName}
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              background: '#ef4444',
              border: 'none',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 8
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">

        <h2 style={{ fontWeight: 700 }}>Fulfillment Instructions</h2>
        <p style={{ color: '#64748b' }}>
          Manage fulfillment operations
        </p>

        <div className="row g-3 mb-4">
          {NAV_ITEMS.map(item => {
            const isActive = activeSegment === item.to;

            return (
              <div key={item.to} className="col-6 col-md-4 col-lg-2">
                <Link to={item.to}>
                  <div
                    className="fi-card card border"
                    style={{
                      borderRadius: 12,
                      borderColor: isActive ? item.color : '#e2e8f0',
                      background: isActive ? item.bg : '#fff'
                    }}
                  >
                    <div className="card-body">
                      <i className={`bi ${item.icon}`} style={{ fontSize: 20, color: item.color }}></i>

                      <div style={{ fontWeight: 600, marginTop: 8 }}>
                        {item.label}
                      </div>

                      <small style={{ color: '#64748b' }}>
                        {item.desc}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {isRoot ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <h5>Welcome</h5>
                <p>Select an option to continue</p>
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