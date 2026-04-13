import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '20rem', opacity: 0.05, fontWeight: 800, color: 'var(--color-primary)', zIndex: -1,
          pointerEvents: 'none'
        }}>
          ALPHA
        </div>

        <h1 className="text-display-lg" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #cdbdff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BEYOND COMPUTING
        </h1>
        <p className="text-body-lg" style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: 'var(--color-on-surface-variant)' }}>
          Alpha IT Solutions engineers the tools for the obsidian ether. High-performance architecture meets surgical precision.
        </p>
        <Link to="/computers" className="btn-primary">
          Explore Collection <ArrowRight size={16} />
        </Link>
      </section>

      {/* Featured Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="text-display-md">The Collection</h2>
          <Link to="/computers" className="text-label-md" style={{ color: 'var(--color-secondary)' }}>Browse All &#8599;</Link>
        </div>

        <div className="grid-auto">
          {/* Computers */}
          <Link to="/computers" className="pro-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '200px', background: 'var(--color-surface-container-lowest)', borderRadius: '0.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <img src="/images/computers/1.jpg" alt="Computers" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(12, 14, 23, 0.8))' }}></div>
              <p style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontWeight: 600 }}>Computers</p>
            </div>
            <h3 className="text-display-sm" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Computers</h3>
          </Link>

          {/* Phones */}
          <Link to="/phones" className="pro-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '200px', background: 'var(--color-surface-container-lowest)', borderRadius: '0.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <img src="/images/phones/1.jpg" alt="Phones" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(12, 14, 23, 0.8))' }}></div>
              <p style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontWeight: 600 }}>Phones</p>
            </div>
            <h3 className="text-display-sm" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Phones</h3>
          </Link>

          {/* Speakers */}
          <Link to="/speakers" className="pro-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '200px', background: 'var(--color-surface-container-lowest)', borderRadius: '0.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <img src="/images/speakers/1.jpg" alt="Speakers" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(12, 14, 23, 0.8))' }}></div>
              <p style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontWeight: 600 }}>Speakers</p>
            </div>
            <h3 className="text-display-sm" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Speakers</h3>
          </Link>

          {/* Cables */}
          <Link to="/cables" className="pro-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '200px', background: 'var(--color-surface-container-lowest)', borderRadius: '0.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <img src="/images/cables/1.jpg" alt="Cables" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(12, 14, 23, 0.8))' }}></div>
              <p style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontWeight: 600 }}>Cables</p>
            </div>
            <h3 className="text-display-sm" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Cables</h3>
          </Link>
        </div>
      </section>

    </div>
  );
}
