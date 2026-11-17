import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', color: '#111', marginBottom: '20px' }}>❤️ Сіздің таңдаулы бұйымдарыңыз</h2>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
          <p style={{ fontSize: '40px', marginBottom: '10px' }}>🤍</p>
          <p style={{ fontSize: '16px' }}>Таңдаулылар тізімі әзірге бос.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {favorites.map((product) => (
            <div key={product.id} style={{
              backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ height: '220px', backgroundColor: '#f9f6f0', position: 'relative' }}>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => toggleFavorite(product)}
                  style={{
                    position: 'absolute', top: '12px', right: '12px', background: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer'
                  }}
                >
                  ❌
                </button>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#111' }}>{product.title}</h4>
                  <p style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#D4AF37' }}>{product.price}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => addToCart(product)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#D4AF37', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                  >
                    🛒 Себетке қосу
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}