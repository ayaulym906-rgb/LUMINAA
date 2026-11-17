import { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';

export default function Cart({ items, onClose, onClear, onRemove }) {
  const { 
    addToCart, 
    decreaseQty, 
    promoCode, 
    setPromoCode, 
    discount, 
    applyPromo,
    deliveryType,
    setDeliveryType,
    paymentMethod,
    setPaymentMethod,
    createOrder
  } = useApp();

  const [inputCode, setInputCode] = useState(promoCode);
  
  // Сыйлық қорабы үшін жеке күй (state)
  const [isGiftBox, setIsGiftBox] = useState(false);

  // Жеткізу мекенжайы
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Жеткізу құны (Экспресс немесе Стандартты)
  const deliveryCost = deliveryType === 'express' ? 2500 : 0;
  
  // Сыйлық қорабының құны (+2000 ₸)
  const giftBoxCost = isGiftBox ? 2000 : 0;

  // Бағаны дұрыс санға айналдыру
  const subTotal = items.reduce((sum, item) => {
    if (!item || !item.price) return sum;
    const numericPrice = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/\D/g, ''), 10) || 0 
      : Number(item.price) || 0;
    return sum + numericPrice * (item.qty || 1);
  }, 0);

  const discountAmount = subTotal * discount;
  const totalPrice = Math.max(0, subTotal - discountAmount) + deliveryCost + giftBoxCost;

  // Тапсырыс беру
  const handleOrder = () => {
    if (!address.trim()) {
      setAddressError(true);
      return;
    }
    createOrder({
      items: [...items],
      total: totalPrice,
      payment: paymentMethod,
      address: address.trim(),
      delivery: (deliveryType === 'express' ? 'Экспресс курьер' : 'Стандартты жеткізу') + (isGiftBox ? ' + Сыйлық қаптамасы' : '')
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div onClick={onClose} style={{ position: 'absolute', width: '100%', height: '100%' }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-5px 0 25px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10000,
        fontFamily: 'sans-serif'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #eaeaea',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#111' }}>
            🛒 Сіздің себетіңіз
          </h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#666' }}
          >
            ✕
          </button>
        </div>

        {/* Тауарлар тізімі */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
              <p style={{ fontSize: '40px', marginBottom: '15px' }}>🛍️</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>Себетіңіз әзірге бос</p>
              <p style={{ fontSize: '14px', color: '#999', marginTop: '5px' }}>Каталогтан өзіңізге ұнаған әшекейді таңдаңыз</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size || index}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #eaeaea',
                  backgroundColor: '#fdfbf7'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '6px' }} 
                    />
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#111', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                  {item.size && (
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#777' }}>
                       Өлшемі: <strong style={{ color: '#D4AF37' }}>{item.size}</strong>
                    </p>
                  )}
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#D4AF37', fontWeight: 'bold' }}>
                      {item.price}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => decreaseQty(item.id, item.size)}
                        style={{ width: '22px', height: '22px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        style={{ width: '22px', height: '22px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item.id, item.size)}
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '14px', padding: '6px' }}
                    title="Өшіру"
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Промокод бөлімі */}
              <div style={{ marginTop: '10px', padding: '12px', background: '#f9f6f0', borderRadius: '8px', border: '1px dashed #D4AF37' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Промокод (мысалы: LUMINA10):</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Промокод..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '12px', outline: 'none' }}
                  />
                  <button 
                    onClick={() => applyPromo(inputCode)}
                    style={{ padding: '8px 14px', background: '#111', color: '#D4AF37', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    Қосу
                  </button>
                </div>
                {discount > 0 && <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#27ae60', fontWeight: 'bold' }}>✓ 10% жеңілдік қолданылды!</p>}
              </div>

              {/* Эксклюзивті сыйлық қаптамасы (Чекбокс опциясы) */}
              <div style={{ 
                marginTop: '5px', 
                padding: '12px', 
                background: '#fff9e6', 
                borderRadius: '8px', 
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
              onClick={() => setIsGiftBox(!isGiftBox)}
              >
                <input 
                  type="checkbox" 
                  checked={isGiftBox} 
                  onChange={(e) => setIsGiftBox(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#D4AF37', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '12px', color: '#333' }}>
                  <strong>🎁 Брендовый эксклюзивный қара қорапша</strong>
                  <div style={{ color: '#D4AF37', fontWeight: '600', marginTop: '2px' }}>+ 2 000 ₸</div>
                </div>
              </div>

              {/* Жеткізу түрі */}
              <div style={{ marginTop: '5px' }}>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Жеткізу түрі:</p>
                <select 
                  value={deliveryType} 
                  onChange={(e) => setDeliveryType(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '12px', background: '#fff' }}
                >
                  <option value="standard">Стандартты жеткізу (Тегін)</option>
                  <option value="express">Экспресс курьер (+2 500 ₸)</option>
                </select>
              </div>

              {/* Жеткізу мекенжайы */}
              <div style={{ marginTop: '5px' }}>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                  Жеткізу мекенжайы:
                </p>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) setAddressError(false);
                  }}
                  placeholder="Қала, көше, үй, пәтер..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: addressError ? '1px solid #e74c3c' : '1px solid #ccc',
                    fontSize: '12px',
                    fontFamily: 'sans-serif',
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {addressError && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#e74c3c' }}>
                    Жеткізу мекенжайын жазыңыз
                  </p>
                )}
              </div>

              {/* Төлем әдісі */}
              <div style={{ marginTop: '5px' }}>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>Төлем әдісі:</p>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '12px', background: '#fff' }}
                >
                  <option value="kaspi">Kaspi Pay / Kaspi QR</option>
                  <option value="card">Банк картасы (Visa/Mastercard)</option>
                  <option value="cash">Тауарды алғанда төлеу</option>
                </select>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #eaeaea',
            backgroundColor: '#f9f6f0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '15px', fontSize: '13px', color: '#555' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Тауарлар бағасы:</span>
                <span>{subTotal.toLocaleString()} ₸</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}>
                  <span>Жеңілдік (10%):</span>
                  <span>-{discountAmount.toLocaleString()} ₸</span>
                </div>
              )}
              {isGiftBox && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D4AF37' }}>
                  <span>Сыйлық қаптамасы:</span>
                  <span>+2 000 ₸</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Жеткізу:</span>
                <span>{deliveryCost === 0 ? 'Тегін' : `${deliveryCost.toLocaleString()} ₸`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#111', borderTop: '1px solid #ddd', paddingTop: '8px', marginTop: '4px' }}>
                <span>Барлығы:</span>
                <span style={{ color: '#D4AF37' }}>{totalPrice.toLocaleString()} ₸</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={onClear}
                style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#666', fontSize: '13px' }}
              >
                Тазарту
              </button>
              <button 
                onClick={handleOrder}
                style={{ flex: 2, padding: '10px', backgroundColor: '#D4AF37', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', fontSize: '13px' }}
              >
                Тапсырыс беру
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
