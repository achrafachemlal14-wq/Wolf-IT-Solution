import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('alpha_cart') || '[]');
    setCart(savedCart);
  }, []);

  const removeItem = (idToRemove) => {
    const updatedCart = cart.filter(item => item.id !== idToRemove);
    setCart(updatedCart);
    localStorage.setItem('alpha_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      // User is not logged in, force registration first.
      // Set a flag so Login knows to come back here.
      sessionStorage.setItem('redirectToCart', 'true');
      navigate('/login');
      return;
    }

    // Combine all products into a neat WhatsApp string
    let msgText = `مرحباً 👋\n\nأود تأكيد طلباتي التالية:\n`;
    
    cart.forEach((product, index) => {
       msgText += `${index + 1}. 📦 ${product.name} - $${product.price} (${product.category})\n`;
    });

    msgText += `\n💰 الإجمالي: $${calculateTotal()}`;
    msgText += `\n📧 حساب الموقع: ${userEmail}\n\nأرجو تزويدي بالتفاصيل، شكراً!`;

    const waNumber = '212698969385';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msgText)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1 className="text-display-md" style={{ marginBottom: '3rem', textAlign: 'center' }}>سلة المشتريات</h1>
        <div className="glass-panel" style={{ padding: '4rem 2rem', borderRadius: '1rem', textAlign: 'center' }}>
          <ShoppingBag size={48} color="var(--color-on-surface-variant)" style={{ margin: '0 auto 1.5rem auto', opacity: 0.5 }} />
          <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>سلتك فارغة حالياً</h2>
          <p className="text-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>
            لم تقم بإضافة أي أجهزة أو ملحقات إلى السلة بعد.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/computers" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              العودة للتسوق <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="text-display-md" style={{ marginBottom: '3rem' }}>سلة المشتريات</h1>
      
      <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Products List (Horizontal Layout using Grid/Flex) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {cart.map((item) => (
            <div key={item.id} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', background: 'rgba(25, 27, 36, 0.8)', flexShrink: 0 }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <span className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>{item.category.toUpperCase()}</span>
                <h3 className="text-body-lg" style={{ fontWeight: 600, marginTop: '0.25rem' }}>{item.name}</h3>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-on-surface)' }}>
                ${item.price}
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="btn-icon transparent" 
                style={{ padding: '0.5rem' }} 
                title="إزالة المنتج"
              >
                <Trash2 size={20} color="#EA4335" />
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Summary Pane */}
        <div className="glass-panel" style={{ width: window.innerWidth < 768 ? '100%' : '350px', padding: '2rem', borderRadius: '1rem', position: 'sticky', top: '100px' }}>
          <h2 className="text-display-sm" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>موجز الطلب</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--color-on-surface-variant)' }}>عدد المنتجات</span>
            <span>{cart.length}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderTop: '1px solid rgba(73, 68, 86, 0.15)', paddingTop: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>الإجمالي</span>
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)' }}>${calculateTotal()}</span>
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={handleCheckout}
          >
            تأكيد الطلب 💬
          </button>
        </div>
      </div>
    </div>
  );
}
