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
    fetch(`http://localhost:3000/api/product/${id}`)
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
            onClick={() => {
              const userEmail = localStorage.getItem('userEmail');
              if (userEmail) {
                const waNumber = '212698969385';
                const msgText = `مرحباً 👋

أود تأكيد شراء المنتج التالي:
📦 المنتج: ${product.name}
💰 السعر: $${product.price}
📂 الفئة: ${product.category}
📧 حساب الموقع: ${userEmail}

أرجو تزويدي بالتفاصيل ، شكراً!`;
                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msgText)}`, '_blank');
              } else {
                // Not registered, redirect to login first
                sessionStorage.setItem('pendingProduct', JSON.stringify({ name: product.name, price: product.price, category: product.category }));
                navigate('/login');
              }
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تأكيد الشراء عبر WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
