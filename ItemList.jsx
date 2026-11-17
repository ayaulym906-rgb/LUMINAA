import { useEffect, useState } from "react";

// Зергерлік брендке сай нақты мәліметтер
const JEWELRY_ITEMS = [
  { id: 1, title: "Lumina Gold Алқасы", category: "Алқа", price: "45 000 ₸", desc: "Табиғи гауһар тастармен көмкерілген ерекше алқа." },
  { id: 2, title: "Silver Shine Сақинасы", category: "Сақина", price: "28 000 ₸", desc: "Күмістен жасалған нәзік әрі заманауи сақина." },
  { id: 3, title: "Crystal Swan Сырғасы", category: "Сырға", price: "35 000 ₸", desc: "Аққу бейнелі жарқыраған талғампаз сырға." },
];

export default function ItemList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    // Жүктелу процесін әдемі көрсету үшін таймер
    const timer = setTimeout(() => {
      if (!alive) return;
      setItems(JEWELRY_ITEMS);
      setLoading(false);
    }, 1000);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "80px", textAlign: "center", color: "#D4AF37", fontSize: "1.2rem" }}>
        ⏳ Мәліметтер жүктелуде, күте тұрыңыз...
      </div>
    );
  }

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Қате: {error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ fontSize: "2.2rem", marginBottom: "10px", color: "#111", fontWeight: "300", textAlign: "center", letterSpacing: "1px" }}>
        Таңдаулы бұйымдар тізімі
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "40px", fontSize: "1rem" }}>
        Lumina брендінің ең талғампаз әрі ерекше топтамалары
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map((it) => (
          <div 
            key={it.id} 
            style={{ 
              background: "#fff", 
              border: "1px solid #eaeaea", 
              borderRadius: "8px", 
              padding: "24px 30px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease"
            }}
          >
            <div>
              <span style={{ fontSize: "0.85rem", color: "#D4AF37", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "600" }}>
                {it.category}
              </span>
              <h3 style={{ fontSize: "1.3rem", color: "#111", margin: "6px 0 8px 0", fontWeight: "500" }}>
                {it.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#666", margin: 0 }}>
                {it.desc}
              </p>
            </div>

            <div style={{ textAlign: "right", minWidth: "130px" }}>
              <span style={{ display: "block", fontSize: "1.2rem", fontWeight: "600", color: "#111", marginBottom: "10px" }}>
                {it.price}
              </span>
              <button 
                style={{ 
                  background: "#111", 
                  color: "#fff", 
                  border: "none", 
                  padding: "10px 20px", 
                  borderRadius: "4px", 
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#D4AF37"}
                onMouseOut={(e) => e.currentTarget.style.background = "#111"}
              >
                Қарау
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}