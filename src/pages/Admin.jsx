import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Plus, Edit2, Trash2, X, Users, Package, Link as LinkIcon } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'phones',
    description: '',
    image: ''
  });

  useEffect(() => {
    // Basic Security Check
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== 'wolfadmin@gmail.com') {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج نهائياً؟')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'phones', description: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="container" style={{ padding: '8rem', textAlign: 'center' }}>جاري التحميل...</div>;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="text-display-md" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings color="var(--color-primary)" size={32} />
            لوحة المشرف
          </h1>
          <p style={{ color: 'var(--color-on-surface-variant)', marginTop: '0.5rem' }}>مرحباً بعودتك! إدارة الموقع والمنتجات.</p>
        </div>
        <button onClick={openAddModal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          إضافة منتج جديد
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #6d28d9' }}>
          <Package size={32} color="#6d28d9" />
          <div>
            <h3 style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>إجمالي المنتجات</h3>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{products.length}</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #0891b2' }}>
          <Users size={32} color="#0891b2" />
          <div>
            <h3 style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>نوع الفئات</h3>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>4</span>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(73, 68, 86, 0.15)', background: 'rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>قائمة المنتجات الحالية</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-container-high)', textAlign: 'right' }}>
                <th style={{ padding: '1rem', color: 'var(--color-on-surface-variant)' }}>المنتج</th>
                <th style={{ padding: '1rem', color: 'var(--color-on-surface-variant)' }}>الفئة</th>
                <th style={{ padding: '1rem', color: 'var(--color-on-surface-variant)' }}>السعر</th>
                <th style={{ padding: '1rem', color: 'var(--color-on-surface-variant)', textAlign: 'center' }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(73, 68, 86, 0.1)' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '0.5rem', objectFit: 'cover', background: '#333' }} />
                    <span style={{ fontWeight: 600 }}>{product.name}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: 'rgba(109, 40, 217, 0.1)', color: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${product.price}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <button onClick={() => openEditModal(product)} className="btn-icon transparent" style={{ padding: '0.5rem' }}>
                        <Edit2 size={18} color="var(--color-secondary)" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="btn-icon transparent" style={{ padding: '0.5rem' }}>
                        <Trash2 size={18} color="#EA4335" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', borderRadius: '1rem', padding: '2rem', background: 'var(--color-surface)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>{editingId ? 'تعديل المنتج' : 'إضافة منتج'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="btn-icon transparent"><X size={24} /></button>
            </div>

            <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>اسم المنتج</label>
                <input required type="text" className="input-pro" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>السعر ($)</label>
                  <input required type="number" step="0.01" className="input-pro" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الفئة</label>
                  <select className="input-pro" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ color: '#000' }}>
                    <option value="computers">Computers</option>
                    <option value="phones">Phones</option>
                    <option value="speakers">Speakers</option>
                    <option value="cables">Cables</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الوصف</label>
                <textarea required className="input-pro" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LinkIcon size={14} /> رابط الصورة (URL)
                </label>
                <input required type="text" className="input-pro" placeholder="https://..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} dir="ltr" />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginTop: '0.25rem' }}>لأفضل نتيجة استخدم صور بمقاس متناسق من Imgur أو مصادر خارجية.</p>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
                {editingId ? 'حفظ التعديلات' : 'نشر المنتج'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
