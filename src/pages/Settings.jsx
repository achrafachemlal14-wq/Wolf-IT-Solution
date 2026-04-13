import { useState, useEffect } from 'react';
import { Camera, Save, User as UserIcon } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', avatar: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
         alert('حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 2 ميغابايت.');
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    // Also update legacy userEmail for backwards compatibility with the product page
    localStorage.setItem('userEmail', profile.email);
    setMessage('تم حفظ الإعدادات بنجاح!');
    // Dispatch custom event to tell Navbar to update
    window.dispatchEvent(new Event('profileUpdated'));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(73, 68, 86, 0.15)' }}>
        <h2 className="text-display-md" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--color-on-surface)' }}>إعدادات الحساب</h2>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'var(--color-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid var(--color-primary)' }}>
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <UserIcon size={55} color="var(--color-on-surface-variant)" />
            )}
            <label style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.6)', cursor: 'pointer', textAlign: 'center', padding: '6px 0', transition: 'background 0.3s' }}>
              <Camera size={18} color="#fff" style={{ margin: '0 auto' }} />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </label>
          </div>
          <p style={{ marginTop: '0.75rem', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>انقر على الأيقونة لتغيير الصورة</p>
        </div>

        {message && <div style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'rgba(100,220,130,0.1)', color: '#4ade80', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid rgba(100,220,130,0.3)' }}>{message}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface)' }}>الاسم الكامل</label>
            <input type="text" className="input-pro" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} placeholder="الاسم" />
          </div>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface)' }}>البريد الإلكتروني</label>
            <input type="email" className="input-pro" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="Email" />
          </div>
          <div>
            <label className="text-label-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-on-surface)' }}>رقم الهاتف</label>
            <input type="tel" className="input-pro" value={profile.phone || ''} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="+212..." />
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={saveSettings} style={{ width: '100%', maxWidth: '300px' }}>
            <Save size={18} />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
