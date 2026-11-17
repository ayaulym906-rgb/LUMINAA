import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, products, addToCart } = useApp();

  // Динамикалық өнімдердің ішінен ең соңғы 4 тауарды басты бетке шығарамыз
  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', paddingTop: '10px' }}>
      
      {/* Үлкен экранды Hero видео баннер */}
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        marginBottom: '30px',
        backgroundColor: '#121212',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1
        }}></div>
        
        {/* Видео фоны */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.65)'
          }}
        >
          <source src="/images/Videos/promo.mp4" type="video/mp4" />
          Сіздің браузер видеоны қолдамайды.
        </video>

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '60px 20px',
          color: '#fff',
          maxWidth: '800px',
          margin: 'auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 'bold' }}>
            {user.name}
          </p>
          <h1 style={{ fontSize: '48px', fontWeight: '400', margin: '0 0 15px 0', color: '#f9f6f0', lineHeight: '1.2' }}>
            Жарықты ұстайтын әшекейлер
          </h1>
          <p style={{ fontSize: '16px', color: '#ddd', marginBottom: '35px', lineHeight: '1.6' }}>
            Табиғи тастармен әшекейленген алтын және күміс бұйымдар. Өз стиліңізді таңдаңыз.
          </p>
          <button
            onClick={() => navigate('/list')}
            style={{
              padding: '14px 32px',
              backgroundColor: '#D4AF37',
              color: '#121212',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.5)',
              transition: 'all 0.3s'
            }}
          >
            Каталогты қарау
          </button>
        </div>
      </div>

      {/* Брендтің басты философиясы */}
      <div style={{ textAlign: 'center', padding: '30px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '400', color: '#111', letterSpacing: '1px', marginBottom: '12px', fontFamily: 'serif' }}>
          Мәңгілік сұлулық
        </h2>
        <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', margin: '0' }}>
          Сіздің қайталанбас тұлғаңызды ерекшелеп, өміріңіздің әр сәтіне жарқырау сыйлау үшін жасалған.
        </p>
      </div>

      {/* Танымал өнімдер секциясы */}
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '500', color: '#111', margin: 0 }}>
            ✨ Танымал әшекейлер
          </h3>
          <button 
            onClick={() => navigate('/list')}
            style={{ background: 'none', border: 'none', color: '#D4AF37', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
          >
            Барлығын көру →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {featuredProducts.map((product) => (
            <div key={product.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #eaeaea',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '220px', backgroundColor: '#f9f6f0', position: 'relative' }}>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#D4AF37', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'
                }}>
                  {product.category}
                </span>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#111' }}>{product.title}</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold', color: '#D4AF37' }}>{product.price}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => addToCart(product)}
                    style={{ flex: 1, padding: '8px', backgroundColor: '#D4AF37', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    🛒 Себетке қосу
                  </button>
                  <button 
                    onClick={() => navigate(`/list/${product.id}`)}
                    style={{ padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    👁️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}