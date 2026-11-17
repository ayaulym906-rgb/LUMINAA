import { useState } from "react";

export default function ApplyForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = "Аты-жөніңізді енгізіңіз";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Жарамсыз email форматы";
    }
    if (values.phone.trim().length < 10) {
      next.phone = "Телефон нөмірі тым қысқа";
    }
    if (values.message.trim().length < 5) {
      next.message = "Өтінім мәтіні тым қысқа";
    }
    return next;
  }

  function onSubmit(e) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", color: "#333" }}>
      <h2>Lumina зергерлік дүкеніне өтінім</h2>
      <p style={{ fontWeight: "bold", color: "#555" }}></p>

      <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label>Аты-жөні (ФИО):</label><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Телефон нөмірі:</label><br />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.phone && <p style={{ color: "red", fontSize: "14px" }}>{errors.phone}</p>}
        </div>

        <div>
          <label>Өтінім / Хабарлама:</label><br />
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px", height: "80px" }}
          />
          {errors.message && <p style={{ color: "red", fontSize: "14px" }}>{errors.message}</p>}
        </div>

        <button type="submit" style={{ padding: "10px", background: "#D4AF37", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
          Өтінімді жіберу
        </button>

        {sent && <p style={{ color: "green", fontWeight: "bold" }}>Заявка сәтті жіберілді!</p>}
      </form>
    </div>
  );
}