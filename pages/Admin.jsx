import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email === 'wolfadmin@gmail.com') {
      setAuthorized(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!authorized) return null;

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="text-display-sm" style={{ color: 'var(--color-primary)' }}>Admin Command Center</h1>
        <button 
          className="btn-secondary" 
          onClick={() => { localStorage.removeItem('userEmail'); navigate('/login'); }}
        >
          Logout
        </button>
      </div>

      <div className="grid-auto">
        <div className="pro-card">
          <h3 className="text-body-lg" style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>System Architecture</h3>
          <p className="text-label-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '1rem' }}>
            All systems nominal. The Obsidian Ether is fully deployed.
          </p>
        </div>
        
        <div className="pro-card">
          <h3 className="text-body-lg" style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>Captured Transmissions</h3>
          <p className="text-label-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '1rem' }}>
            Data streams are being routed through secure SMTP channels to the receiver.
          </p>
        </div>
      </div>
    </div>
  );
}
