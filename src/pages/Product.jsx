import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  // Simple drag interaction array to simulate 3D rotation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    let isDragging = false;
    let previousX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousX = e.clientX || e.touches?.[0].clientX;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches?.[0].clientX;
      const diff = currentX - previousX;
      setRotation(prev => prev + diff * 0.5);
      previousX = currentX;
    };

    const onMouseUp = () => isDragging = false;

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    el.addEventListener('touchstart', onMouseDown);
    el.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      el.removeEventListener('touchstart', onMouseDown);
      el.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [loading]);

  if (loading) return <div className="container" style={{ padding: '8rem' }}>Initializing component...</div>;
  if (!product) return <div className="container" style={{ padding: '8rem' }}>Component not found.</div>;

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '4rem', alignItems: 'center' }}>
        
        {/* Simulated 3D Viewer / Product Image */}
        <div 
          ref={containerRef}
          style={{ 
            height: '600px', 
            background: 'var(--color-surface-container-low)', 
            borderRadius: '1rem', 
            position: 'relative',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
          title="Drag to rotate"
        >
          {/* We simulate 3D rotation using CSS transform for an abstract element or show image */}
          <div style={{
             width: '300px', height: '400px', 
             border: '1px solid var(--color-primary)',
             boxShadow: '0 0 50px rgba(205,189,255,0.2)',
             transformStyle: 'preserve-3d',
             transform: `perspective(800px) rotateY(${rotation}deg) rotateX(15deg)`,
             transition: 'transform 0.1s ease-out',
             position: 'relative'
          }}>
             <div style={{ position: 'absolute', inset: 0, background: 'rgba(25, 27, 36, 0.8)', border: '1px solid var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(30px)' }} />
             </div>
          </div>

          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.8rem' }}>
            &#8596; Interactive Rotation
          </div>
        </div>

        {/* Details Pane */}
        <div>
          <span className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>{product.category.toUpperCase()} SERIES</span>
          <h1 className="text-display-sm" style={{ margin: '0.5rem 0 1.5rem 0' }}>{product.name}</h1>
          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>${product.price}</span>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '1.05rem', padding: '1rem' }}
            onClick={(e) => {
              const cart = JSON.parse(localStorage.getItem('alpha_cart') || '[]');
              cart.push({ 
                id: product.id || Date.now(), 
                name: product.name, 
                price: product.price, 
                category: product.category,
                image: product.image 
              });
              localStorage.setItem('alpha_cart', JSON.stringify(cart));
              window.dispatchEvent(new Event('cartUpdated'));
              e.currentTarget.innerHTML = 'تمت الإضافة! سلة المشتريات 🛒';
              setTimeout(() => {
                if (e.currentTarget) {
                   e.currentTarget.innerHTML = 'إضافة إلى السلة';
                }
              }, 2000);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            إضافة إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
}
