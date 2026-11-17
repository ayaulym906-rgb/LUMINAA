import { useEffect } from 'react';
import { useApp } from '../store/AppContext';

export default function RingSizeGuideModal({ isOpen, onClose }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div onClick={onClose} style={{ position: 'absolute', width: '100%', height: '100%' }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '550px',
        backgroundColor: isDark ? '#161616' : '#fff',
        color: isDark ? '#fff' : '#111',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '1px solid #D4AF37',
        zIndex: 10000,
        fontFamily: 'sans-serif',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Жабу батырмасы */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#D4AF37'
          }}
        >
          ✕
        </button>

        <h2 style={{ color: '#D4AF37', fontSize: '20px', marginTop: 0, marginBottom: '15px', fontWeight: '500' }}>
          💍 Сақина өлшемін анықтау нұсқаулығы
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', color: isDark ? '#ccc' : '#555', marginBottom: '20px' }}>
          Саусағыңыздың өлшемін дұрыс анықтау үшін жіпті немесе қағаз жолағын саусағыңызға орап, сызғышпен ұзындығын (миллиметрмен) өлшеңіз. Алынған мән сақинаның ішкі шеңберінің ұзындығы болып табылады.
        </p>

        {/* Өлшемдер кестесі */}
        <div style={{ marginBottom: '25px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #D4AF37', color: '#D4AF37' }}>
                <th style={{ padding: '10px' }}>Өлшем (EU/CIS)</th>
                <th style={{ padding: '10px' }}>Саусақ айналымы (мм)</th>
                <th style={{ padding: '10px' }}>Диаметр (мм)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid ' + (isDark ? '#333' : '#eee') }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>16</td>
                <td style={{ padding: '10px' }}>50.2 мм</td>
                <td style={{ padding: '10px' }}>16.0 мм</td>
              </tr>
              <tr style={{ borderBottom: '1px solid ' + (isDark ? '#333' : '#eee') }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>17</td>
                <td style={{ padding: '10px' }}>53.4 мм</td>
                <td style={{ padding: '10px' }}>17.0 мм</td>
              </tr>
              <tr style={{ borderBottom: '1px solid ' + (isDark ? '#333' : '#eee') }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>18</td>
                <td style={{ padding: '10px' }}>56.5 мм</td>
                <td style={{ padding: '10px' }}>18.0 мм</td>
              </tr>
              <tr style={{ borderBottom: '1px solid ' + (isDark ? '#333' : '#eee') }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>19</td>
                <td style={{ padding: '10px' }}>59.7 мм</td>
                <td style={{ padding: '10px' }}>19.0 мм</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>20</td>
                <td style={{ padding: '10px' }}>62.8 мм</td>
                <td style={{ padding: '10px' }}>20.0 мм</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: isDark ? '#222' : '#fdfbf7', padding: '12px 16px', borderRadius: '8px', border: '1px dashed #D4AF37', fontSize: '13px', color: isDark ? '#bbb' : '#666', marginBottom: '20px' }}>
          💡 <strong>Кеңес:</strong> Егер өлшемдердің арасында қалсаңыз, үлкенірек өлшемін таңдағаныңыз жөн. Кешкі уақытта немесе ыстықта саусақтар сәл ісінетінін ескеріңіз.
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#D4AF37',
            color: '#121212',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Түсінікті, жабу
        </button>
      </div>
    </div>
  );
}