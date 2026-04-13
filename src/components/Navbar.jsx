import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check local storage for user and cart
    const checkUser = () => {
      const saved = localStorage.getItem('userProfile');
      if (saved) setUserProfile(JSON.parse(saved));
    };
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('alpha_cart') || '[]');
      setCartCount(cart.length);
    };

    checkUser();
    updateCart();
    
    // Listen for custom events
    window.addEventListener('profileUpdated', checkUser);
    window.addEventListener('cartUpdated', updateCart);
    
    return () => {
      window.removeEventListener('profileUpdated', checkUser);
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    document.body.classList.toggle('light-mode', nextMode);
  };

  return (
    <nav className="glass-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          ALPHA IT
        </Link>
        <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', gap: '1.5rem' }}>
           <Link to="/computers" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Computers</Link>
           <Link to="/phones" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Phones</Link>
           <Link to="/cables" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Cables</Link>
           <Link to="/speakers" className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>Speakers</Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Dark / Light Toggle */}
        <button onClick={toggleTheme} className="btn-icon transparent">
          {isLightMode ? <Moon size={20} color="var(--color-on-surface)" /> : <Sun size={20} color="var(--color-on-surface)" />}
        </button>

        {/* Profile / Login */}
        {userProfile ? (
          <button onClick={() => navigate('/settings')} className="btn-icon transparent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '2rem', border: '1px solid var(--color-primary)', background: 'rgba(100,50,200,0.1)' }}>
            {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Avatar" style={{ width:'24px', height:'24px', borderRadius:'50%', objectFit:'cover' }} />
            ) : (
                <User size={20} color="var(--color-primary)" />
            )}
            <span className="text-label-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
               {userProfile.name ? userProfile.name.split(' ')[0] : 'أنا'}
            </span>
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className="btn-icon transparent">
            <User size={20} color="var(--color-on-surface)" />
          </button>
        )}

        <button onClick={() => navigate('/cart')} className="btn-icon transparent" style={{ position: 'relative' }}>
          <ShoppingCart size={20} color="var(--color-on-surface)" />
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '0', right: '0', background: '#E1306C', color: 'white', fontSize: '0.65rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(25%, -25%)' }}>
              {cartCount}
            </span>
          )}
        </button>
        <button className="btn-icon transparent" style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }} onClick={() => setIsOpen(!isOpen)}>
          <Menu size={20} color="var(--color-on-surface)" />
        </button>
      </div>

      {isOpen && (
        <div className="surface-level-2" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <Link to="/computers" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-on-surface)' }}>Computers</Link>
           <Link to="/phones" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-on-surface)' }}>Phones</Link>
           <Link to="/cables" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-on-surface)' }}>Cables</Link>
           <Link to="/speakers" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-on-surface)' }}>Speakers</Link>
        </div>
      )}
    </nav>
  );
}
