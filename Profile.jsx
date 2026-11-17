import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, setUser, theme } = useApp();

  // Қолданушы деректерін өңдеу күйлері
  const [name, setName] = useState(user.name || 'Арайлым Жолдыбай');
  const [email, setEmail] = useState(user.email || 'araylym@lumina.kz');
  const [phone, setPhone] = useState(user.phone || '+7 (777) 123-45-67');
  const [isSaved, setIsSaved] = useState(false);

  // 1. Мекенжайлар кітапшасы күйі
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Үй', address: 'Абай көшесі 15, кв. 42, Алматы қ.' },
    { id: 2, title: 'Жұмыс', address: 'Достық даңғылы 45, БЦ "Lumina Tower", Алматы қ.' }
  ]);
  const [newAddress, setNewAddress] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // 2. Бонус / Кошелек күйі
  const [bonusBalance, setBonusBalance] = useState(15000); // 15 000 ₸ бонус
  const promoCode = 'LUMINA2026';

  // Мекенжай қосу функциясы
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.trim() || !newTitle.trim()) return;
    setAddresses([...addresses, { id: Date.now(), title: newTitle, address: newAddress }]);
    setNewAddress('');
    setNewTitle('');
  };

  // Мекенжайды өшіру
  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  // Профильді сақтау
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name, email, phone });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '30px', fontFamily: 'sans-serif', background: theme === 'dark' ? '#1a1a1a' : '#fff', borderRadius: '16px', border: '1px solid #e6dcc6', boxShadow: '0 4px 25px rgba(0,0,0,0.06)' }}>
      
      {/* Header / VIP Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #D4AF37', paddingBottom: '20px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: '#D4AF37', margin: 0, fontSize: '24px' }}>✨ Жеке Кабинет</h2>
          <p style={{ color: theme === 'dark' ? '#aaa' : '#666', margin: '5px 0 0 0', fontSize: '13px' }}>
            Lumina премиум клиентінің профилі
          </p>
        </div>
        
        {/* VIP Мәртебесі */}
        <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #aa820a 100%)', color: '#121212', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 4px 12px rgba(212,175,55,0.3)' }}>
          👑 VIP Gold Member (10% Жеңілдік)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Сол жақ: Профильді өңдеу + Бонус баланс */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Бонус баланс және промокод (Wallet) */}
          <div style={{ backgroundColor: theme === 'dark' ? '#222' : '#fdfaf0', border: '1px solid #D4AF37', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '16px', margin: '0 0 10px 0' }}>💳 Lumina Wallet & Бонустар</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', color: theme === 'dark' ? '#ddd' : '#444' }}>Балансыңыз:</span>
              <strong style={{ fontSize: '18px', color: '#D4AF37' }}>{bonusBalance.toLocaleString()} ₸</strong>
            </div>
            <div style={{ fontSize: '12px', color: '#888', background: theme === 'dark' ? '#161616' : '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #D4AF37' }}>
              🎁 Жеке промокодыңыз: <strong style={{ color: '#D4AF37' }}>{promoCode}</strong> (Сатып алу кезінде 10% береді)
            </div>
          </div>

          {/* Жеке мәліметтерді өңдеу */}
          <div style={{ backgroundColor: theme === 'dark' ? '#222' : '#f9f8f5', padding: '20px', borderRadius: '12px', border: '1px solid #e6dcc6' }}>
            <h3 style={{ fontSize: '16px', color: theme === 'dark' ? '#fff' : '#333', marginBottom: '15px' }}>👤 Жеке деректер</h3>
            
            {isSaved && (
              <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', marginBottom: '15px', fontWeight: 'bold' }}>
                ✔ Өзгерістер сәтті сақталды!
              </div>
            )}

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>Аты-жөніңіз</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>Телефон нөмірі</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit"
                style={{ marginTop: '5px', padding: '10px', backgroundColor: '#D4AF37', color: '#121212', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
              >
                Сақтау
              </button>
            </form>
          </div>

        </div>

        {/* Оң жақ: Мекенжайлар кітапшасы және ИИ ұсыныстар */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Мекенжайлар кітапшасы */}
          <div style={{ backgroundColor: theme === 'dark' ? '#222' : '#f9f8f5', padding: '20px', borderRadius: '12px', border: '1px solid #e6dcc6' }}>
            <h3 style={{ fontSize: '16px', color: theme === 'dark' ? '#fff' : '#333', marginBottom: '12px' }}>📍 Жеткізу мекенжайлары</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
              {addresses.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)', fontSize: '13px' }}>
                  <div>
                    <strong style={{ color: '#D4AF37', display: 'block' }}>{item.title}</strong>
                    <span style={{ color: theme === 'dark' ? '#ccc' : '#555' }}>{item.address}</span>
                  </div>
                  <button onClick={() => handleDeleteAddress(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }} title="Өшіру">✕</button>
                </div>
              ))}
            </div>

            {/* Жаңа мекенжай қосу формасы */}
            <form onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Атауы (Мысалы: Ата-аналар үйі)" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', fontSize: '12px' }}
              />
              <input 
                type="text" 
                placeholder="Толық мекенжайы" 
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', color: theme === 'dark' ? '#fff' : '#000', fontSize: '12px' }}
              />
              <button type="submit" style={{ padding: '8px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                + Мекенжай қосу
              </button>
            </form>
          </div>

          {/* ИИ Дербес ұсыныстар блок */}
          <div style={{ backgroundColor: theme === 'dark' ? '#222' : '#fdfaf0', padding: '15px 20px', borderRadius: '12px', border: '1px dashed #D4AF37' }}>
            <h3 style={{ color: '#D4AF37', fontSize: '15px', margin: '0 0 8px 0' }}>✨ ИИ Сауда Сараптамасы</h3>
            <p style={{ fontSize: '12px', color: theme === 'dark' ? '#aaa' : '#666', margin: '0 0 10px 0', lineHeight: '1.4' }}>
              «Сіздің талғамыңызға сүйене отырып, Lumina AI сізге гауһар тасты сақиналар мен алтын алқалар топтамасын ұсынады.»
            </p>
            <Link to="/list" style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
              Каталогтан қарау ➔
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}