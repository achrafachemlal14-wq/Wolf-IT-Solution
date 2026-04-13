import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Category({ title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const category = title === 'Phones' ? 'phones' : title.toLowerCase();
    fetch(`http://localhost:3000/api/products/${category}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [title]);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="text-display-md" style={{ marginBottom: '3rem' }}>{title}</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading Obsidian Series...</div>
      ) : (
        <div className="grid-auto">
          {items.map(item => (
            <Link key={item.id} to={`/product/${item.id}`} className="pro-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                height: '240px', 
                background: 'var(--color-surface-container-lowest)', 
                borderRadius: '0.5rem', 
                marginBottom: '1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 className="text-body-lg" style={{ fontWeight: 600 }}>{item.name}</h3>
                 <span className="text-label-md" style={{ color: 'var(--color-secondary)' }}>${item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

