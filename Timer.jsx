import { useState, useEffect } from 'react';

export default function Timer({ seconds = 300 }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Минут пен секундқа бөлу
  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
      border: '1px solid #D4AF37',
      borderRadius: '12px',
      padding: '25px 30px',
      maxWidth: '500px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ 
        color: '#D4AF37', 
        fontSize: '13px', 
        letterSpacing: '2px', 
        textTransform: 'uppercase', 
        marginBottom: '8px',
        fontWeight: '600'
      }}>
        ✨ Эксклюзивті ұсыныс
      </div>
      
      <h4 style={{ 
        fontSize: '20px', 
        fontWeight: '400', 
        marginBottom: '15px', 
        color: '#f9f6f0' 
      }}>
        Арнайы жеңілдік аяқталуға қалды
      </h4>

      {/* Таймердің сандық көрсеткіші */}
      <div style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#D4AF37',
        letterSpacing: '2px',
        marginBottom: '20px',
        textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
      }}>
        {timeLeft > 0 ? formattedTime : "Уақыт аяқталды!"}
      </div>

      {/* Батырмалар */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '8px 18px',
            background: 'transparent',
            border: '1px solid #D4AF37',
            color: '#D4AF37',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          {isActive ? 'Уақытты тоқтату' : 'Жалғастыру'}
        </button>

        <button
          onClick={() => {
            setTimeLeft(300);
            setIsActive(true);
          }}
          style={{
            padding: '8px 18px',
            background: '#D4AF37',
            border: 'none',
            color: '#121212',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          Қайта бастау
        </button>
      </div>
    </div>
  );
}