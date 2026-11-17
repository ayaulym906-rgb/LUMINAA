import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoModal from './InfoModal';

export default function Footer() {
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });

  const handleOpen = (title, content) => {
    setModalData({ isOpen: true, title, content });
  };

  const handleClose = () => {
    setModalData({ isOpen: false, title: '', content: '' });
  };

  return (
    <>
      <footer style={{
        backgroundColor: '#0a0a0a',
        color: '#fff',
        padding: '60px 20px 30px 20px',
        marginTop: '60px',
        fontFamily: 'sans-serif',
        borderTop: '1px solid #222'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
          borderBottom: '1px solid #222',
          paddingBottom: '40px'
        }}>
          {/* 1-ші баған: Қызмет көрсету */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
              Қызмет көрсету
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#bbb' }}>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigate('/orders')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Тапсырыс күйі</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Жеткізу шарттары', 'Алматы және Астана қалалары бойынша жеткізу 1-2 күн ішінде жүзеге асырылады. Басқа өңірлерге Қазпочта немесе курьерлік қызмет арқылы 3-7 жұмыс күні ішінде жеткізіледі. Жеткізу құны — тегін (100 000 ₸ жоғары тапсырыстарға).')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Жеткізу шарттары</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Төлем әдістері', 'Біздің интернет-дүкенде төлемнің келесі түрлері қолжетімді:\n• Kaspi Pay / Kaspi QR арқылы онлайн төлем\n• Visa / MasterCard халықаралық банк карталары\n• Тапсырысты алған кезде қолма-қол немесе карта арқылы төлеу.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Төлем әдістері</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Өлшем кестесі', 'Әр зергерлік бұйым үшін (әсіресе сақиналар мен білезіктер) ресми өлшем кестесі қарастырылған. Өлшеміңізді дәл анықтау үшін өнім бетіндегі нұсқаулықты пайдаланыңыз немесе бутик менеджерлеріне хабарласыңыз.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Өлшем кестесі</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Байланыс орталығы', 'Бізбен байланысу үшін:\n📞 Телефон: +7 (777) 123-45-67\n✉️ Email: support@lumina.kz\n📍 Мекенжай: Алматы қ., Достық даңғылы 12/1\nЖұмыс уақыты: Күн сайын 10:00 - 20:00')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Байланыс</li>
            </ul>
          </div>

          {/* 2-ші баған: Lumina Туралы */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
              Lumina Туралы
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#bbb' }}>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Бренд тарихы', 'Lumina — 2026 жылы негізі қаланған премиум класс зергерлік бұйымдар бренді. Біздің басты мақсатымыз — ең жоғары сапалы алтын, күміс және асыл тастардан жасалған ерекше дизайнды әшекейлерді ұсыну.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Бренд тарихы</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Мансап', 'Lumina командасына қосылғыңыз келсе, өз түйіндемеңізді hr@lumina.kz поштасына жолдаңыз. Біз үнемі дарынды мамандар мен кеңсенің жаңа қызметкерлерін ізтейміз.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Мансап</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Серіктестер үшін', 'Брендтермен, дизайнерлермен және көтерме жеткізушілермен әріптестік орнатуға ашықпыз. Хабарласу үшін: partner@lumina.kz')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Серіктестер үшін</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Бутиктер картасы', 'Фирменный бутиктеріміз орналасқан орындар:\n• Алматы қ., Достық д-лы 12/1, Lumina Plaza\n• Астана қ., Қонаев көшесі 14, Talan Gallery')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Бутиктер картасы</li>
            </ul>
          </div>

          {/* 3-ші баған: Құқықтық ережелер */}
          <div>
            <h4 style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
              Құқықтық ережелер
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#bbb' }}>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Қолдану шарттары', 'Сайттағы барлық мәтіндік және графикалық материалдар Lumina брендінің меншігі болып табылады және авторлық құқықпен қорғалған.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Қолдану шарттары</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Құпиялылық саясаты', 'Қазақстан Республикасының дербес деректер туралы заңына сәйкес, сіздің жеке ақпаратыңыз қатаң түрде қорғалады және үшінші тарапқа берілмейді.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Құпиялылық саясаты</li>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => handleOpen('Cookie файлдары', 'Бұл сайт тәжірибені жақсарту және статистика жинау мақсатында cookie файлдарын қолданады. Сайтты пайдалану арқылы сіз олардың қолданылуына келісесіз.')} onMouseOver={(e) => e.target.style.color='#D4AF37'} onMouseOut={(e) => e.target.style.color='#bbb'}>Cookie файлдары</li>
            </ul>
          </div>

          {/* 4-ші баған: Логотип пен әлеуметтік желілер */}
          <div>
            <h3 
              onClick={() => navigate('/')} 
              style={{ fontSize: '24px', letterSpacing: '3px', color: '#D4AF37', marginBottom: '10px', fontWeight: '300', cursor: 'pointer' }}
            >
              LUMINA
            </h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              Премиум класс зергерлік бұйымдары мен ерекше сұлулық әлемі.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => window.open('https://instagram.com', '_blank')} title="Instagram">📸</span>
              <span style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => window.open('https://facebook.com', '_blank')} title="Facebook">📘</span>
              <span style={{ cursor: 'pointer', fontSize: '16px' }} onClick={() => window.open('https://telegram.org', '_blank')} title="Telegram">🕊️</span>
            </div>
          </div>
        </div>

        {/* Ең астыңғы авторлық құқық бөлігі */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '12px',
          color: '#666'
        }}>
          <p style={{ margin: 0 }}>© 2026 LUMINA Jewelry. Барлық құқықтар қорғалған.</p>
          <p style={{ margin: 0, color: '#D4AF37' }}>Дизайнер: Жолдыбай Арайлым</p>
        </div>
      </footer>

      {/* Ақпарат шығатын модалды терезе */}
      <InfoModal 
        isOpen={modalData.isOpen} 
        onClose={handleClose} 
        title={modalData.title} 
        content={modalData.content} 
      />
    </>
  );
}