import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function List() {
  const navigate = useNavigate();
  const { products, favorites, toggleFavorite, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Барлығы');
  const [sort, setSort] = useState('default');
  const [selectedSizes, setSelectedSizes] = useState({}); // Әр тауар үшін өлшем

  const categories = ['Барлығы', 'Алқа', 'Сақина', 'Сырға', 'Білезік'];
  const sizes = ['16', '17', '18', '19'];

  const filteredProducts = products.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Барлығы' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/\D/g, ''), 10);
    const priceB = parseInt(b.price.replace(/\D/g, ''), 10);
    if (sort === 'asc') return priceA - priceB;
    if (sort === 'desc') return priceB - priceA;
    return 0;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px 40px' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <input 
          type="text"
          placeholder="Әшекейді іздеу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '260px', padding: '12px 18px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', backgroundColor: '#fff' }}
        />

        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: '12px 18px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
        >
          <option value="default">Сұрыптау (Әдепкі)</option>
          <option value="asc">Бағасы: Арзаннан бастап</option>
          <option value="desc">Бағасы: Қымбаттан бастап</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '35px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: category === cat ? '1px solid #D4AF37' : '1px solid #ddd',
              backgroundColor: category === cat ? '#D4AF37' : '#fff',
              color: category === cat ? '#fff' : '#444',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
          <p style={{ fontSize: '18px' }}>Іздеу бойынша ешнарсе табылмады 😔</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {sortedProducts.map((product) => {
            const isFav = favorites.some((f) => f.id === product.id);
            const currentSize = selectedSizes[product.id] || '17';
            const isRing = product.category === 'Сақина';
            return (
              <div key={product.id} style={{
                backgroundColor: '#fff',
                border: '1px solid #eaeaea',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Таңдаулыға қосу батырмасы (Жүрекше) */}
                <button
                  onClick={() => toggleFavorite(product)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255,255,255,0.85)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  title="Таңдаулыға сақтау"
                >
                  {isFav ? '❤️' : '🤍'}
                </button>

                <div style={{ height: '250px', backgroundColor: '#f9f6f0', position: 'relative' }}>
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#D4AF37', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold'
                  }}>
                    {product.category}
                  </span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '600', color: '#111' }}>{product.title}</h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold', color: '#D4AF37' }}>{product.price}</p>

                    {/* Өлшемді таңдау (тек сақинаға) */}
                    {isRing && (
                      <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>Өлшемі:</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {sizes.map((sz) => (
                             <button
                                key={sz}
                                onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: sz })}
                                style={{
                                   padding: '4px 8px',
                                   fontSize: '11px',
                                   borderRadius: '4px',
                                   border: currentSize === sz ? '1px solid #D4AF37' : '1px solid #ddd',
                                   backgroundColor: currentSize === sz ? '#D4AF37' : '#fff',
                                   color: currentSize === sz ? '#fff' : '#333',
                                   cursor: 'pointer',
                                   fontWeight: 'bold'
                                }}
                             >
                                {sz}
                             </button>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => addToCart(isRing ? { ...product, size: currentSize } : product)}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#D4AF37', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                    >
                      🛒 Себетке қосу
                    </button>
                    <button 
                      onClick={() => navigate(`/list/${product.id}`)}
                      style={{ padding: '10px 14px', backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}