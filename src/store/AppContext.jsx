import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ name: "Lumina Store" });
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("kaspi");

  // Тауарлар енді Supabase базасынан келеді
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      triggerToast("❌ Тауарларды жүктеу мүмкін болмады");
    } else {
      setProducts(data || []);
    }
    setProductsLoading(false);
  }

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  async function addProduct(newProd) {
    // id базада автоматты түрде беріледі
    const { id, ...fields } = newProd;
    const { data, error } = await supabase
      .from("products")
      .insert(fields)
      .select()
      .single();

    if (error) {
      console.error(error);
      triggerToast("❌ Қате: тауар қосылмады");
      return false;
    }
    setProducts((prev) => [...prev, data]);
    triggerToast("✨ Жаңа бұйым сәтті қосылды!");
    return true;
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error(error);
      triggerToast("❌ Қате: тауар жойылмады");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    triggerToast("🗑️ Бұйым жойылды");
  }

  function triggerToast(message) {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  function toggleFavorite(product) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        triggerToast("Таңдаулыдан алынды");
        return prev.filter((item) => item.id !== product.id);
      } else {
        triggerToast("✨ Таңдаулыға қосылды!");
        return [...prev, product];
      }
    });
  }

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    triggerToast(`🛍️ "${item.title}" себетке қосылды!`);
  }

  function decreaseQty(id, size) {
    setCart((prev) => {
      return prev.map((i) => {
        if (i.id === id && i.size === size) {
          const newQty = (i.qty || 1) - 1;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  }

  function removeFromCart(id, size) {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    triggerToast("🗑️ Тауар себеттен алынып тасталды");
  }

  function clearCart() {
    setCart([]);
    setDiscount(0);
    setPromoCode("");
    triggerToast("🗑️ Себет тазартылды");
  }

  function applyPromo(code) {
    if (code.trim().toUpperCase() === "LUMINA10" || code.trim().toUpperCase() === "GOLDEN") {
      setDiscount(0.1);
      triggerToast("🎉 Промокод қабылданды: 10% жеңілдік!");
    } else {
      setDiscount(0);
      triggerToast("❌ Қате немесе жарамсыз промокод");
    }
  }

  function createOrder(orderData) {
    setOrders((prev) => [orderData, ...prev]);
    clearCart();
    triggerToast("✨ Тапсырыс сәтті рәсімделді!");
  }

  const value = {
    theme, toggleTheme, user, setUser,
    favorites, toggleFavorite,
    cart, addToCart, decreaseQty, removeFromCart, clearCart,
    toast, promoCode, setPromoCode, discount, applyPromo,
    deliveryType, setDeliveryType, paymentMethod, setPaymentMethod,
    orders, createOrder,
    products, productsLoading, addProduct, deleteProduct
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '25px', right: '25px',
          backgroundColor: '#121212', color: '#D4AF37', padding: '12px 20px',
          borderRadius: '8px', border: '1px solid #D4AF37', boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
          zIndex: 9999, fontWeight: '600', fontSize: '14px'
        }}>
          {toast}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
