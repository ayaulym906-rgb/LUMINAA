import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

const productsDB = [
  { id: 1, title: "Lumina Gold Гауһар Алқасы", price: 85000, category: "алқа", desc: "Күнделікті және кешкі образға арналған классикалық гауһар алқа." },
  { id: 2, title: "Silver Shine Күміс Сақинасы", price: 32000, category: "сақина", desc: "Нәзік күміс сақина, бюджеттік әрі әдемі сыйлық." },
  { id: 3, title: "Crystal Swan Аққу Сырғасы", price: 45000, category: "сырға", desc: "Аққу пішінді нәзік сырға, нәзік жандыларға таптырмас сыйлық." },
  { id: 4, title: "Royal Pearl Маржан Білезігі", price: 60000, category: "білезік", desc: "Табиғи маржандармен көмкерілген сәнді білезік." },
  { id: 5, title: "Golden Sun Алтын Жүзігі", price: 75000, category: "сақина", desc: "Күн сәулесіндей жарқырайтын алтын жүзік." },
  { id: 6, title: "Diamond Drop Бриллиант Алқасы", price: 120000, category: "алқа", desc: "Ерекше кештерге арналған сәнді бриллиант алқа." },
  { id: 7, title: "Lumina Classic Сағат Баулығы", price: 95000, category: "аксессуар", desc: "Сағатқа арналған премиум аксессуар." },
  { id: 8, title: "Eternal Sparkle Гауһар Сырғасы", price: 110000, category: "сырға", desc: "Мәңгілік жарқырау сыйлайтын гауһар сырға." },
  { id: 9, title: "Royal Heart Сақинасы", price: 145000, category: "сақина", desc: "Жүрек пішінді гауһар тасты сақина. Сезім білдіруге ең үздік таңдау!" },
  { id: 10, title: "Emerald Empress Алқасы", price: 180000, category: "алқа", desc: "Зүмірет (Emerald) қырлы патшайымдарға лайық алқа." },
  { id: 11, title: "Asscher Luminesce Сырғасы", price: 135000, category: "сырға", desc: "Сирек кездесетін Asscher огранкасындағы ерекше сырға." },
  { id: 12, title: "Cushion Royal Білезік Комплекті", price: 210000, category: "білезік", desc: "Cushion қырлы тастармен безендірілген премиум жиынтық." }
];

export default function AIChatbot() {
  const { theme } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Сәлеметсіз бе! ✨ Мен — Lumina AI зергерлік кеңесшісімін. Сізге қандай әшекей таңдауға көмектесейін? (Мысалы: "Сақина ұсыншы", "50 000 теңгеге дейін сыйлық", "Сырғалар")'
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateBotReply = (userText) => {
    const q = userText.toLowerCase();

    if (q.includes('50000') || q.includes('50 000') || q.includes('арзан') || q.includes('бюджет')) {
      const cheap = productsDB.filter(p => p.price <= 60000);
      return {
        text: 'Міне, 60 000 ₸ дейінгі ең танымал әрі нәзік нұсқалар:',
        products: cheap
      };
    }

    if (q.includes('қымбат') || q.includes('vip') || q.includes('ерекше') || q.includes('ұсыныс')) {
      const vip = productsDB.filter(p => p.price >= 135000);
      return {
        text: 'Ерекше сәттерге арналған эксклюзивті огранкадағы премиум бұйымдар:',
        products: vip
      };
    }

    if (q.includes('сақина') || q.includes('жүзік')) {
      const rings = productsDB.filter(p => p.category === 'сақина');
      return {
        text: 'Біздің топтамадағы ең әдемі сақиналар тізімі:',
        products: rings
      };
    }

    if (q.includes('алқа') || q.includes('мойын')) {
      const necklaces = productsDB.filter(p => p.category === 'алқа');
      return {
        text: 'Мойныңызға сән беретін гауһар және зүмірет алқалар:',
        products: necklaces
      };
    }

    if (q.includes('сырға')) {
      const earrings = productsDB.filter(p => p.category === 'сырға');
      return {
        text: 'Кез келген образды ашатын сәнді сырғалар:',
        products: earrings
      };
    }

    if (q.includes('білезік')) {
      const bracelets = productsDB.filter(p => p.category === 'білезік');
      return {
        text: 'Қолыңызға нәзіктік сыйлайтын білезіктер:',
        products: bracelets
      };
    }

    if (q.includes('сәлем') || q.includes('салем') || q.includes('қалайсың')) {
      return {
        text: 'Сәлеметсіз бе! 💎 Бүгін өзіңізге немесе жақыныңызға қандай әшекей іздеп жүрсіз? Санатты немесе бюджетті жазсаңыз, дәл тауып беремін!'
      };
    }

    return {
      text: 'Түсіндім! Сізге дәлірек көмектесу үшін қандай бұйым іздеп жүргеніңізді нақтылап жазыңызшы (мысалы: «Сақина», «Алқа», «Сырға», «Білезік» немесе «50 000 теңгеге дейін»).'
    };
  };

  const handleSend = (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply.text,
        products: reply.products || null
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = ['💍 Сақиналар', '✨ 50 000 ₸ дейін', '👑 VIP сыйлықтар', '💎 Сырғалар'];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#D4AF37',
          color: '#121212',
          border: 'none',
          boxShadow: '0 6px 25px rgba(212, 175, 55, 0.5)',
          fontSize: '26px',
          cursor: 'pointer',
          zIndex: 1500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        title="Lumina AI Кеңесші"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '25px',
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            height: '500px',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
            border: '1px solid #D4AF37',
            borderRadius: '16px',
            boxShadow: '0 10px 35px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1500,
            fontFamily: 'sans-serif'
          }}
        >
          <div style={{ background: 'linear-gradient(135deg, #121212 0%, #2a2415 100%)', padding: '15px 20px', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>✨</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>Lumina AI Кеңесші</h4>
                <span style={{ fontSize: '11px', color: '#4ade80' }}>● Онлайн (Зергерлік сарапшы)</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: theme === 'dark' ? '#141414' : '#fdfbf7' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    backgroundColor: msg.sender === 'user' ? '#D4AF37' : (theme === 'dark' ? '#262626' : '#fff'),
                    color: msg.sender === 'user' ? '#121212' : (theme === 'dark' ? '#f5f5f5' : '#222'),
                    border: msg.sender === 'bot' ? '1px solid #e6dcc6' : 'none',
                    fontSize: '13.5px',
                    lineHeight: '1.4',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}
                >
                  {msg.text}
                </div>

                {msg.products && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/list/${prod.id}`);
                        }}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: theme === 'dark' ? '#222' : '#fff',
                          border: '1px solid #D4AF37',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '12px'
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', color: theme === 'dark' ? '#fff' : '#111' }}>{prod.title}</strong>
                          <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>{prod.price.toLocaleString()} ₸</span>
                        </div>
                        <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>Көру ➔</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                Lumina AI жазуда...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                onClick={() => handleSend(null, qp)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  border: '1px solid #D4AF37',
                  background: 'transparent',
                  color: '#D4AF37',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {qp}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #e6dcc6', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}>
            <input
              type="text"
              placeholder="Сұрағыңызды жазыңыз..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '8px',
                fontSize: '13px',
                backgroundColor: 'transparent',
                color: theme === 'dark' ? '#fff' : '#111'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#D4AF37',
                color: '#121212',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Жіберу
            </button>
          </form>
        </div>
      )}
    </>
  );
}