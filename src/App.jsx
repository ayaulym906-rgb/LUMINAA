import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import GiftCards from './pages/GiftCards';
import ApplyForm from './pages/ApplyForm';
import Profile from './pages/Profile';
import Admin from './pages/Admin'; // <--- 1. Админ бетін импорттау
import NotFound from './pages/NotFound';
import AIChatbot from './components/AIChatbot';

function MainLayout() {
  const { cart, addToCart, removeFromCart, clearCart, orders } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfbf7' }}>
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main style={{ flex: 1, padding: '20px', width: '100%', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/list" element={<List onAdd={addToCart} />} />
          <Route path="/list/:id" element={<Details onAdd={addToCart} />} />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/favorites" element={<Favorites onAdd={addToCart} />} />
          <Route path="/gift-cards" element={<GiftCards onAdd={addToCart} />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} /> {/* <--- 2. Админ маршруты */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <AIChatbot />

      {isCartOpen && (
        <Cart 
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onClear={clearCart}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}