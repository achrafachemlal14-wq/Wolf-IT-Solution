import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(73, 68, 86, 0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: '#cdbdff' }}>
          ALPHA IT
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', display: window.innerWidth > 768 ? 'flex' : 'none' }}>
           <Link to="/computers" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Computers</Link>
           <Link to="/phones" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Phones</Link>
           <Link to="/cables" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Cables</Link>
           <Link to="/speakers" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Speakers</Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/login')} className="btn-icon transparent">
          <User size={20} />
        </button>
        <button onClick={() => navigate('/cart')} className="btn-icon transparent">
          <ShoppingCart size={20} />
        </button>
        <button className="btn-icon transparent" style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }} onClick={() => setIsOpen(!isOpen)}>
          <Menu size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="surface-level-2" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <Link to="/computers" onClick={() => setIsOpen(false)}>Computers</Link>
           <Link to="/phones" onClick={() => setIsOpen(false)}>Phones</Link>
           <Link to="/cables" onClick={() => setIsOpen(false)}>Cables</Link>
           <Link to="/speakers" onClick={() => setIsOpen(false)}>Speakers</Link>
        </div>
      )}
    </nav>
  );
}
