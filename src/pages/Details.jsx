import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import RingSizeGuideModal from '../components/RingSizeGuideModal';

export default function Details({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [selectedSize, setSelectedSize] = useState('17');
  
  // Модалды терезе үшін state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // Пікірлерге арналған стейттер
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Айжан М.', rating: 5, text: 'Өте әдемі әшекей! Суреттегіден де керемет көрінеді, сапасы жоғары.', date: '12.10.2026' },
    { id: 2, name: 'Дильназ К.', rating: 5, text: 'Жеткізу өте жылдам болды. Сыйлыққа қорабымен бірге келді, рақмет!', date: '15.10.2026' }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  // Барлық өнімдер тізімі (мінездемелерімен бірге)
  const allProducts = [
    { 
      id: 1, 
      title: 'Lumina Gold Гауһар Алқасы', 
      category: 'Алқа', 
      price: '85 000 ₸', 
      image: '/images/alka.jpeg', 
      description: 'Табиғи гауһар тастармен көмкерілген ерекше сапалы алтын алқа.',
      specs: { metal: '585 пробалы алтын', stone: 'Табиғи гауһар (Классикалық круглый)', weight: '4.2 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 2, 
      title: 'Silver Shine Күміс Сақинасы', 
      category: 'Сақина', 
      price: '32 000 ₸', 
      image: '/images/saqina.jpeg', 
      description: 'Жоғары сапалы 925 пробалы күмістен жасалған классикалық сақина.',
      specs: { metal: '925 пробалы күміс', stone: 'Циркон', weight: '2.8 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 3, 
      title: 'Crystal Swan Аққу Сырғасы', 
      category: 'Сырға', 
      price: '45 000 ₸', 
      image: '/images/aqqu.jpeg', 
      description: 'Аққу бейнесіндегі нәзік әрі жарқыраған сырғалар жиынтығы.',
      specs: { metal: '925 пробалы күміс (алтын жалатылған)', stone: 'Австриялық кристалл', weight: '3.5 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 4, 
      title: 'Royal Pearl Маржан Білезігі', 
      category: 'Білезік', 
      price: '60 000 ₸', 
      image: '/images/bilezik.jpeg', 
      description: 'Қолдың сұлулығын айқындайтын премиум кластағы маржанды білезік.',
      specs: { metal: '585 пробалы алтын жалату', stone: 'Табиғи маржан', weight: '6.0 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 5, 
      title: 'Golden Sun Алтын Жүзігі', 
      category: 'Сақина', 
      price: '75 000 ₸', 
      image: '/images/zhuzik.jpeg', 
      description: 'Ерекше дизайнмен жасалған салтанатты кештерге арналған алтын жүзік.',
      specs: { metal: '585 пробалы алтын', stone: 'Жартылай асыл тастар', weight: '5.1 г', warranty: '1 жыл ресми кепілдік' }
    },
    { 
      id: 6, 
      title: 'Diamond Drop Бриллиант Алқасы', 
      category: 'Алқа', 
      price: '120 000 ₸', 
      image: '/images/saqina.jpeg', 
      description: 'Таза бриллиантпен көмкерілген салтанатты әрі жарқыраған алқа.',
      specs: { metal: '750 пробалы ақ алтын', stone: 'Табиғи бриллиант (Овал огранкасы)', weight: '5.4 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 7,
      title: 'Lumina Classic Сағат Баулығы',
      category: 'Аксессуар',
      price: '95 000 ₸',
      image: '/images/sagat.jpeg',
      description: 'Швейцариялық механизмі мен сапалы былғары бауы бар классикалық сағат.',
      specs: { metal: 'Шын былғары / Болат', stone: 'Тастарсыз', weight: '6.7 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 8,
      title: 'Eternal Sparkle Гауһар Сырғасы',
      category: 'Сырға',
      price: '110 000 ₸',
      image: '/images/eki-syrga.jpg',
      description: 'Керемет гауһар тастары бар әрі сәнді ұзын сырғалар.',
      specs: { metal: '585 пробалы ақ алтын', stone: 'Табиғи гауһар (Триллион огранкасы)', weight: '4.0 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 9,
      title: 'Royal Heart Сақинасы',
      category: 'Сақина',
      price: '145 000 ₸',
      image: '/images/royal-saqina.jpeg',
      description: '59 гранды жүрек пішінді сиқырлы бриллиантпен көмкерілген романтикалық жүзік.',
      specs: { metal: '750 пробалы ақ алтын', stone: 'Табиғи бриллиант («Сердце» огранкасы)', weight: '4.8 г', warranty: '2 жыл ресми кепілдік' }
    },
    {
      id: 10,
      title: 'Emerald Empress Алқасы',
      category: 'Алқа',
      price: '180 000 ₸',
      image: '/images/alka.jpeg',
      description: 'Тастың мөлдірлігі мен тереңдігін айқындайтын ступичатый огранкалы алқа.',
      specs: { metal: '585 пробалы сары алтын', stone: 'Мөлдір сапфир («Изумруд» огранкасы)', weight: '7.5 г', warranty: '2 жыл ресми кепілдік' }
    },
    {
      id: 11,
      title: 'Asscher Luminesce Сырғасы',
      category: 'Сырға',
      price: '135 000 ₸',
      image: '/images/syrga2.jpeg',
      description: 'Винтажды және заманауи стильді біріктіретін квадрат пішінді сырға.',
      specs: { metal: '925 пробалы платина жалатылған күміс', stone: 'Бриллиант («Ашер» огранкасы)', weight: '4.3 г', warranty: '1 жыл ресми кепілдік' }
    },
    {
      id: 12,
      title: 'Cushion Royal Білезік Комплекті',
      category: 'Білезік',
      price: '210 000 ₸',
      image: '/images/bilezik.jpeg',
      description: 'Жұмсақ бұрышты, королдік стильдегі эксклюзивті білезік пен сақина жиынтығы.',
      specs: { metal: '585 пробалы ақ алтын', stone: 'Таза бриллиант («Кушон» огранкасы)', weight: '12.0 г', warranty: '3 жыл ресми кепілдік' }
    },
    {
      id: 13,
      title: '«Aurum & Platinum Duet» Брошьы',
      category: 'Аксессуар',
      price: '450 000 ₸',
      image: '/images/brosh.jpeg',
      description: 'Жарық пен жылудың үйлесімі.',
      specs: { metal: '750 пробалы ақ алтын', stone: '585 пробалы сары алтын ', weight: '1.5 карат', warranty: '3 жыл ресми кепілдік' }
    },
    {
      id: 14,
      title: '«The Diamond Cascade» Брошьы',
      category: 'Аксессуар',
      price: '800 000 ₸',
      image: '/images/brosh1.jpeg',
      description: 'Тазалық пен жарқыраудың шыңы.',
      specs: { metal: 'Табиғи бриллиант', stone: 'Таза бриллиант (Огранка:Ашер)', weight: '1.8 карат', warranty: '3 жыл ресми кепілдік' }
    }
  ];

  const product = allProducts.find(p => p.id === Number(id)) || allProducts[0];
  const isFav = favorites.some(f => f.id === product.id);
  const isRing = product.category === 'Сақина';
  const sizes = ['16', '17', '18', '19'];

  // Пікір қосу функциясы
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const reviewItem = {
      id: Date.now(),
      name: newAuthor,
      rating: Number(newRating),
      text: newText,
      date: new Date().toLocaleDateString()
    };

    setReviews([reviewItem, ...reviews]);
    setNewAuthor('');
    setNewText('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', paddingBottom: '50px' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}
      >
        ← Артқа қайту
      </button>

      {/* Негізгі карточка */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ height: '380px', backgroundColor: '#f9f6f0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={() => toggleFavorite(product)}
            style={{
              position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)',
              border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ backgroundColor: '#fff9e6', color: '#D4AF37', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #D4AF37' }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '26px', margin: '15px 0 10px 0', color: '#111', fontWeight: '500' }}>{product.title}</h2>
            
            {/* Рейтинг жұлдызшалары */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
              <span style={{ color: '#f39c12', fontSize: '16px' }}>★★★★★</span>
              <span style={{ fontSize: '13px', color: '#666' }}>({reviews.length} пікір)</span>
            </div>

            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#D4AF37', margin: '0 0 15px 0' }}>{product.price}</p>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>

            {/* Техникалық мінездемелер */}
            <div style={{ backgroundColor: '#fdfbf7', padding: '15px', borderRadius: '10px', border: '1px solid #f0e6d2', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', color: '#111', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>✨ Өнім сипаттамасы:</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#555', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Металл:</strong> {product.specs.metal}</li>
                <li><strong>Тас түрі:</strong> {product.specs.stone}</li>
                <li><strong>Салмағы:</strong> {product.specs.weight}</li>
                <li><strong>Кепілдік:</strong> {product.specs.warranty}</li>
              </ul>
            </div>

            {/* Өлшемді таңдау (тек сақинаға) */}
            {isRing && (
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>Өлшемін таңдаңыз:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '12px', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}
                  >
                    📏 Өлшемді қалай табуға болады?
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '8px 14px', fontSize: '13px', borderRadius: '6px',
                        border: selectedSize === sz ? '1px solid #D4AF37' : '1px solid #ddd',
                        backgroundColor: selectedSize === sz ? '#D4AF37' : '#fff',
                        color: selectedSize === sz ? '#fff' : '#333', cursor: 'pointer', fontWeight: 'bold'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => onAdd(isRing ? { ...product, size: selectedSize } : product)}
            style={{ width: '100%', padding: '14px', backgroundColor: '#D4AF37', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 4px 15px rgba(212,175,55,0.3)' }}
          >
            🛒 Себетке қосу
          </button>
        </div>
      </div>

      {/* Пікірлер мен рейтинг секциясы */}
      <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea' }}>
        <h3 style={{ fontSize: '20px', color: '#111', marginBottom: '20px', fontWeight: '500' }}>
          💬 Сатып алушылардың пікірлері
        </h3>

        {/* Пікірлер тізімі */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{ padding: '16px', backgroundColor: '#fdfbf7', borderRadius: '10px', border: '1px solid #f0e6d2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ fontSize: '14px', color: '#111' }}>{rev.name}</strong>
                <span style={{ fontSize: '12px', color: '#888' }}>{rev.date}</span>
              </div>
              <div style={{ color: '#f39c12', fontSize: '13px', marginBottom: '6px' }}>
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#444', lineHeight: '1.5' }}>{rev.text}</p>
            </div>
          ))}
        </div>

        {/* Жаңа пікір жазу формасы */}
        <form onSubmit={handleAddReview} style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h4 style={{ fontSize: '15px', marginBottom: '15px', color: '#333' }}>Өз пікіріңізді қалдырыңыз</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input 
              type="text"
              placeholder="Аты-жөніңіз..."
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px', outline: 'none' }}
              required
            />
            <select 
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', background: '#fff' }}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 - Керемет)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Жақсы)</option>
              <option value="3">⭐⭐⭐ (3 - Қанағаттанарлық)</option>
              <option value="2">⭐⭐ (2 - Нашар)</option>
              <option value="1">⭐ (1 - Өте нашар)</option>
            </select>
          </div>
          <textarea 
            placeholder="Пікіріңізді жазыңыз..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows="3"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', marginBottom: '15px', resize: 'vertical' }}
            required
          ></textarea>
          <button 
            type="submit"
            style={{ padding: '10px 24px', backgroundColor: '#111', color: '#D4AF37', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
          >
            Пікір жіберу
          </button>
        </form>
      </div>

      {/* Сақина өлшемін анықтау модалды терезесі */}
      <RingSizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />
    </div>
  );
}
