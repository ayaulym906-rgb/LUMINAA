import { useState } from 'react';
import { useApp } from '../store/AppContext';

export default function GiftCards({ onAdd }) {
  const { theme } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const predefinedAmounts = [15000, 25000, 50000, 100000];

  const handleAddToCart = () => {
    const amount = customAmount ? Number(customAmount) : selectedAmount;
    if (!amount || amount <= 0) return;

    const giftCardItem = {
      id: `gift-card-${Date.now()}`,
      title: `Lumina Электронды Сыйлық Сертификаты (${amount.toLocaleString()} ₸)`,
      price: `${amount} ₸`,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop', // Премиум сыйлық қорабы/карта суреті
      size: 'Электронды',
      qty: 1,
      details: {
        recipientName: recipientName || 'Досыңызға',
        recipientEmail: recipientEmail || ' көрсетілмеген',
        message: message || 'Lumina брендінен ерекше сыйлық!'
      }
    };

    onAdd(giftCardItem);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const isDark = theme === 'dark';

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif', color: isDark ? '#fff' : '#111' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '32px', fontWeight: '300', letterSpacing: '2px', marginBottom: '10px' }}>
          LUMINA СЫЙЛЫҚ СЕРТИФИКАТТАРЫ
        </h1>
        <p style={{ color: isDark ? '#aaa' : '#666', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          Жақындарыңызға таңдау еркіндігін сыйлаңыз. Кез келген мерекеге арналған ең нәзік әрі мәртебелі сыйлық.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Сертификаттың визуалды көрінісі */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
          borderRadius: '16px',
          padding: '30px',
          color: '#fff',
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          border: '1px solid #D4AF37',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#D4AF37', fontWeight: 'bold', letterSpacing: '2px', fontSize: '18px' }}>✨ LUMINA</span>
            <span style={{ fontSize: '12px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Gift Card</span>
          </div>

          <div style={{ margin: '20px 0' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Сертификат номиналы:</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#D4AF37' }}>
              {(customAmount ? Number(customAmount) || 0 : selectedAmount).toLocaleString()} ₸
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#ccc', borderTop: '1px solid rgba(212,175,55,0.3)', paddingTop: '12px' }}>
            {recipientName ? `Кімге: ${recipientName}` : 'Кімге: [Аты-жөні]'}
          </div>
        </div>

        {/* Толтыру формасы */}
        <div style={{
          background: isDark ? '#161616' : '#fdfbf7',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: isDark ? '#333' : '#eaeaea',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#D4AF37' }}>Сертификат параметрлері</h3>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Құнын таңдаңыз немесе енгізіңіз:</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px' }}>
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedAmount === amount && !customAmount ? '#D4AF37' : (isDark ? '#444' : '#ccc'),
                    background: selectedAmount === amount && !customAmount ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    color: isDark ? '#fff' : '#111',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {amount.toLocaleString()} ₸
                </button>
              ))}
            </div>
            <input 
              type="number"
              placeholder="Немесе өз сомаңызды жазыңыз..."
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: isDark ? '#444' : '#ccc',
                background: isDark ? '#222' : '#fff',
                color: isDark ? '#fff' : '#111',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Алушының аты:</label>
            <input 
              type="text"
              placeholder="Мысалы: Арайлым"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid ' + (isDark ? '#444' : '#ccc'), background: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#111', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Алушының Email поштасы:</label>
            <input 
              type="email"
              placeholder="example@mail.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid ' + (isDark ? '#444' : '#ccc'), background: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#111', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Құттықтау сөзі:</label>
            <textarea 
              rows="3"
              placeholder="Жылы лебізіңізді жазыңыз..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid ' + (isDark ? '#444' : '#ccc'), background: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#111', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              padding: '14px',
              backgroundColor: '#D4AF37',
              color: '#121212',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            Себетке қосу 🛒
          </button>

          {success && (
            <div style={{ color: '#27ae60', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
              ✓ Сыйлық сертификаты себетке сәтті қосылды!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}