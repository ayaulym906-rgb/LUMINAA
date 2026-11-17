export default function InfoModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: '#161616',
        color: '#fff',
        padding: '30px 40px',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        border: '1px solid #D4AF37',
        position: 'relative',
        fontFamily: 'sans-serif'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#D4AF37',
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        
        <h3 style={{ color: '#D4AF37', fontSize: '20px', marginBottom: '15px', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          {title}
        </h3>
        
        <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', marginBottom: '25px' }}>
          {content}
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
          Жабу
        </button>
      </div>
    </div>
  );
}