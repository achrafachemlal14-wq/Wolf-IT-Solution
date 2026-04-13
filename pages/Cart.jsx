import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Cart() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="text-display-md" style={{ marginBottom: '3rem' }}>Cart</h1>
      
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1rem', textAlign: 'center' }}>
        <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>No Items Selected</h2>
        <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>
          Your cart is operating at zero capacity. Initialize an order from the collection.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/computers" className="btn-primary">
            Browse Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
