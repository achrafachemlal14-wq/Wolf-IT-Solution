import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="surface-level-1" style={{
      padding: '4rem 2rem 2rem 2rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(73, 68, 86, 0.15)',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-display-sm" style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>ALPHA IT</h2>
        <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          ISTA BAB TIZIMI MEKNÈS - Engineering the future of tactical computing and modern UI/UX design.
        </p>

        {/* Contact Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/aws_olf?igsh=MXhuMnp3NXJkb3Q2dA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-on-surface)', background: 'var(--color-surface-container-high)', padding: '0.6rem 1.2rem', borderRadius: '2rem', transition: 'all 0.3s', textDecoration: 'none' }} className="footer-link">
            <Instagram size={18} color="#E1306C" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>إنستقرام</span>
          </a>
          <a href="mailto:Achrafachemlal14@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-on-surface)', background: 'var(--color-surface-container-high)', padding: '0.6rem 1.2rem', borderRadius: '2rem', transition: 'all 0.3s', textDecoration: 'none' }} className="footer-link">
            <Mail size={18} color="#EA4335" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>إيميل</span>
          </a>
          <a href="https://wa.me/212698969385" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-on-surface)', background: 'var(--color-surface-container-high)', padding: '0.6rem 1.2rem', borderRadius: '2rem', transition: 'all 0.3s', textDecoration: 'none' }} className="footer-link">
            <Phone size={18} color="#25D366" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>+212 698-969385</span>
          </a>
        </div>

        <div style={{ height: '1px', background: 'rgba(73, 68, 86, 0.15)', margin: '2rem 0' }}></div>
        
        <p className="text-label-md" style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>
          Developed by <span style={{ color: 'var(--color-secondary)' }}>RIDA ELHAMZAOUI</span> - ISTA BAB TIZIMI MEKNÈS
        </p>
      </div>

      <style>{`
        .footer-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          background: var(--color-surface-container-highest) !important;
        }
      `}</style>
    </footer>
  );
}
