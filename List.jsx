import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';

// Zергерлік өнімдердің қазақша атаулары мен бағалары
const jewelryNames = {
  1: { title: "Lumina Gold Гауһар Алқасы", priceNum: 85000, price: "85 000 ₸", category: "Алқа" },
  2: { title: "Silver Shine Күміс Сақинасы", priceNum: 32000, price: "32 000 ₸", category: "Сақина" },
  3: { title: "Crystal Swan Аққу Сырғасы", priceNum: 45000, price: "45 000 ₸", category: "Сырға" },
  4: { title: "Royal Pearl Маржан Білезігі", priceNum: 60000, price: "60 000 ₸", category: "Білезік" },
  5: { title: "Golden Sun Алтын Жүзігі", priceNum: 75000, price: "75 000 ₸", category: "Сақина" },
  6: { title: "Diamond Drop Бриллиант Алқасы", priceNum: 120000, price: "120 000 ₸", category: "Алқа" },
  7: { title: "Lumina Classic Сағат Баулығы", priceNum: 95000, price: "95 000 ₸", category: "Аксессуар" },
  8: { title: "Eternal Sparkle Гауһар Сырғасы", priceNum: 110000, price: "110 000 ₸", category: "Сырға" },
  9: { title: "Royal Heart Сақинасы", priceNum: 145000, price: "145 000 ₸", category: "Сақина" },
  10: { title: "Emerald Empress Алқасы", priceNum: 180000, price: "180 000 ₸", category: "Алқа" },
  11: { title: "Asscher Luminesce Сырғасы", priceNum: 135000, price: "135 000 ₸", category: "Сырға" },
  12: { title: "Cushion Royal Білезік Комплекті", priceNum: 210000, price: "210 000 ₸", category: "Білезік" },
  13: {title: "Aurum & Platinum Duet» Брошьы", priceNum: 450000, price: "450 000 ₸", category: "Аксессуар"},
  14: {title: "The Diamond Cascade» Брошьы", priceNum: 800000, price: "800 000 ₸", category: "Аксессуар"},
};

export default function List() {
  const { favorites, toggleFavorite, theme } = useApp();

  // 12 өнімді тікелей массив түріне айналдырамыз
  const [items] = useState(
    Object.entries(jewelryNames).map(([id, val]) => ({
      id: Number(id),
      ...val
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Барлығы');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

  // Сүзгілеу және іздеу логикасы
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Барлығы' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortOrder === 'asc') return a.priceNum - b.priceNum;
    if (sortOrder === 'desc') return b.priceNum - a.priceNum;
    return 0; // default
  });

  const categories = ['Барлығы', 'Алқа', 'Сақина', 'Сырға', 'Білезік', 'Аксессуар'];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      {/* Топ пен қатысушының Аты-жөні */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '12px 20px', 
        background: theme === 'dark' ? '#1e1e1e' : '#fdfbf7', 
        border: '1px solid #e6dcc6', 
        borderRadius: '8px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '14px',
        color: theme === 'dark' ? '#D4AF37' : '#8c7835'
      }}>
      </div>

      <h1 style={{ color: theme === 'dark' ? '#f5f5f5' : '#1a1a1a', marginBottom: '10px', borderBottom: '2px solid #D4AF37', paddingBottom: '10px' }}>
        ✨ Тауарлар каталогы
      </h1>
      <p style={{ color: theme === 'dark' ? '#aaa' : '#666', marginBottom: '20px' }}>
        Lumina брендінің ең танымал әшекейлері. Іздеңіз, сүзіңіз және таңдаулыға қосыңыз:
      </p>

      {/* Іздеу және Сұрыптау панелі */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="🔍 Әшекейді іздеу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid #D4AF37',
            background: theme === 'dark' ? '#1e1e1e' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid #D4AF37',
            background: theme === 'dark' ? '#1e1e1e' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="default">Сұрыптау (Әдепкі)</option>
          <option value="asc">Бағасы: Арзаннан қымбатқа</option>
          <option value="desc">Бағасы: Қымбаттан арзанға</option>
        </select>
      </div>

      {/* Санаттар батырмалары */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #D4AF37',
              background: selectedCategory === cat ? '#D4AF37' : 'transparent',
              color: selectedCategory === cat ? '#121212' : '#D4AF37',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Тізім немесе егер табылмаasa */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: theme === 'dark' ? '#aaa' : '#666' }}>
          <p style={{ fontSize: '16px' }}>🔍 Іздеу бойынша ешқандай әшекей табылмады.</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
          {filteredItems.map((item) => {
            const isFavorite = favorites.includes(item.id);
            return (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link 
                  to={`/list/${item.id}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 20px',
                    background: theme === 'dark' ? '#1e1e1e' : '#fdfbf7',
                    border: '1px solid #e6dcc6',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: theme === 'dark' ? '#f5f5f5' : '#333',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '600' }}>
                      {item.category}
                    </span>
                    <span style={{ fontWeight: '600', fontSize: '18px', color: theme === 'dark' ? '#fff' : '#111' }}>
                      {item.title}
                    </span>
                  </div>
                  
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '16px' }}>
                      {item.price}
                    </span>
                    <span style={{ color: theme === 'dark' ? '#ccc' : '#555', fontWeight: '500' }}>
                      Қарау ➔
                    </span>
                  </div>
                </Link>

                {/* Таңдаулыға қосу батырмасы (★) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(item.id);
                  }}
                  style={{
                    padding: '15px 18px',
                    background: isFavorite ? '#D4AF37' : (theme === 'dark' ? '#2a2a2a' : '#fff'),
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: isFavorite ? '#121212' : '#D4AF37',
                    transition: '0.2s'
                  }}
                  title={isFavorite ? "Таңдаулыдан алу" : "Таңдаулыға қосу"}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}