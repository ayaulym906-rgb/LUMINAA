import { useApp } from '../store/AppContext';

export default function Orders() {
  const { orders } = useApp();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', padding: '10px 0' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <span style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>
          ✨ Lumina Зергерлік Үйі
        </span>
        <h2 style={{ fontSize: '28px', color: '#111', margin: '10px 0 5px 0', fontWeight: '400' }}>
          Менің тапсырыстарым
        </h2>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Барлық жасалған тапсырыстарыңыз бен олардың күйі
        </p>
      </div>

      {orders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          backgroundColor: '#fff', 
          border: '1px solid #eaeaea', 
          borderRadius: '16px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.03)'
        }}>
          <p style={{ fontSize: '48px', marginBottom: '15px' }}>📦</p>
          <h3 style={{ fontSize: '18px', color: '#111', marginBottom: '8px' }}>Әзірге ешқандай тапсырыс жок</h3>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Каталогтан өзіңізге ұнаған әшекейді таңдап, тапсырыс беріп көріңіз.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff', 
              border: '1px solid rgba(212, 175, 55, 0.3)', 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Жоғарғы алтын жиек декор */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '3px',
                background: 'linear-gradient(90deg, #D4AF37, #f3e5ab, #D4AF37)'
              }}></div>

              {/* Тапсырыс нөмірі мен статусы */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #eee', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Тапсырыс идентификаторы</span>
                  <span style={{ fontWeight: 'bold', color: '#D4AF37', fontSize: '16px' }}>#{idx + 1001}</span>
                </div>
                <div style={{ 
                  backgroundColor: '#fff9e6', 
                  color: '#b38f27', 
                  border: '1px solid #D4AF37', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '600' 
                }}>
                  ✨ Өңделуде
                </div>
              </div>

              {/* Тапсырыс ішіндегі тауарлар тізімі */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Тауарлар:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items && order.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#444', backgroundColor: '#fdfbf7', padding: '8px 12px', borderRadius: '6px', alignItems: 'center' }}>
                      <span>
                       {item.title || 'Әшекей бұйымы'}
                        {item.size && <> (Өлшемі: <strong>{item.size}</strong>)</>}
                        {' '}× {item.qty || 1}
                      </span>
                      <span style={{ fontWeight: 'bold', color: '#111' }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Қосымша мәліметтер */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px', color: '#555', backgroundColor: '#f9f6f0', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px' }}>
                <div>
                  <span>Төлем әдісі:</span> <strong style={{ color: '#111' }}>{order.payment ? order.payment.toUpperCase() : 'KASPI'}</strong>
                </div>
                <div>
                  <span>Жеткізу мекенжайы:</span> <strong style={{ color: '#111' }}>{order.address || '—'}</strong>
                </div>
              </div>

              {/* Жалпы сома */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px dashed #ddd' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>Барлығы төленді:</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#D4AF37' }}>
                  {order.total ? order.total.toLocaleString() : 0} ₸
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}