import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function Header({ onCartClick }) {
  const { cart, favorites, orders, theme, toggleTheme, user } = useApp();
  const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#D4AF37' : (theme === 'dark' ? '#fff' : '#333'),
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: isActive ? '600' : '500',
    transition: 'color 0.2s ease',
    padding: '12px 20px',
    display: 'block',
    borderRadius: '8px',
    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
  });

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              background: 'none',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#D4AF37',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Мәзірді ашу"
          >
            ☰
          </button>

          <NavLink to="/" style={{ textDecoration: 'none', color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>
            ✨ LUMINA
          </NavLink>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', opacity: 0.8 }}>👤 {user.name}</span>

          <div 
            onClick={onCartClick}
            style={{ 
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid #D4AF37',
              padding: '7px 14px',
              borderRadius: '20px',
              color: '#D4AF37',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            <span>🛒 Себет:</span>
            <span style={{ 
              background: '#D4AF37', 
              color: '#121212', 
              padding: '1px 6px', 
              borderRadius: '50%', 
              fontSize: '11px',
              fontWeight: 'bold' 
            }}>
              {totalCount}
            </span>
          </div>

          <button 
            onClick={toggleTheme}
            style={{ padding: '6px 10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '4px', cursor: 'pointer' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {isSidebarOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'flex-start',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'absolute', width: '100%', height: '100%' }} />

          <div style={{
            position: 'relative',
            width: '280px',
            height: '100%',
            backgroundColor: theme === 'dark' ? '#161616' : '#fff',
            boxShadow: '5px 0 25px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            zIndex: 2001,
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '15px' }}>
              <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>✨ LUMINA MENU</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#D4AF37' }}
              >
                ✕
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }} onClick={() => setIsSidebarOpen(false)}>
              <NavLink to="/" style={navLinkStyle}>🏠 Басты бет</NavLink>
              <NavLink to="/list" style={navLinkStyle}>💎 Каталог</NavLink>
              <NavLink to="/admin" style={navLinkStyle}>⚙️ Әкімші панелі</NavLink> {/* немесе ⚙️ Дүкенді басқару */}
              <NavLink to="/profile" style={navLinkStyle}>👤 Жеке профиль</NavLink>
              <NavLink to="/favorites" style={navLinkStyle}>❤️ Таңдаулылар ({favorites.length})</NavLink>
              <NavLink to="/orders" style={navLinkStyle}>📦 Тапсырыстар ({orders.length})</NavLink>
              <NavLink to="/gift-cards" style={navLinkStyle}>🎁 Сыйлық карталары</NavLink>
              <NavLink to="/apply" style={navLinkStyle}>📄 Өтінім</NavLink>
            </nav>

            <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', paddingTop: '15px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
              © 2026 LUMINA Jewelry
            </div>
          </div>
        </div>
      )}
    </>
  );
}