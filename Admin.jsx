import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { supabase } from '../supabase';

// Суретті кішірейтіп (макс 800px) JPEG файл етеді
const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('blob'))),
          'image/jpeg',
          0.85
        );
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  marginBottom: '6px',
  color: '#444',
};

const emptyForm = {
  title: '',
  category: 'Сақина',
  price: '',
  description: '',
  metal: '',
  stone: '',
  weight: '',
  warranty: '1 жыл ресми кепілдік',
};

export default function Admin() {
  const { products, addProduct, deleteProduct } = useApp();

  const [ok, setOk] = useState(true);
  const [pass, setPass] = useState('');

  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    if (!file) {
      setError('Алдымен сурет таңдаңыз.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // 1. Суретті Supabase Storage-ке жүктеу
      const blob = await compressImage(file);
      const path = `${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage
        .from('images')
        .upload(path, blob, { contentType: 'image/jpeg' });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from('images').getPublicUrl(path);

      // 2. Тауарды базаға қосу
      const success = await addProduct({
        title: form.title,
        category: form.category,
        price: form.price.includes('₸') ? form.price : `${form.price} ₸`,
        image: pub.publicUrl,
        description: form.description,
        specs: {
          metal: form.metal,
          stone: form.stone,
          weight: form.weight,
          warranty: form.warranty,
        },
      });

      if (success) {
        setForm(emptyForm);
        setFile(null);
        setPreview('');
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
      setError('Қате: сурет жүктелмеді. Supabase баптауларын тексеріңіз.');
    }
    setSaving(false);
  };

  if (!ok) {
    return (
      <div style={{ maxWidth: 300, margin: '100px auto', display: 'grid', gap: 10 }}>
        <input
          type="password"
          placeholder="Құпиясөз"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={() => {
            if (pass === 'lumina2026') {
              sessionStorage.setItem('adminOk', '1');
              setOk(true);
            }
          }}
          style={{ background: '#D4AF37', color: '#fff', border: 'none', padding: 12, borderRadius: 8, cursor: 'pointer' }}
        >
          Кіру
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#121212', paddingBottom: '40px' }}>
      <h1 style={{ color: '#D4AF37', marginBottom: '10px', borderBottom: '2px solid #D4AF37', paddingBottom: '10px' }}>
        ✨ Lumina - Әкімші панелі
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Бұл бет арқылы каталогқа жаңа зергерлік бұйымдар қосып және қажетсіздерін өшіре аласыз.
      </p>

      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '35px', border: '1px solid #eaeaea' }}>
        <h3 style={{ marginBottom: '20px', color: '#111' }}>📦 Жаңа зергерлік бұйым қосу</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Бұйым атауы:</label>
            <input type="text" placeholder="Мысалы: Lumina Gold Сақина" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} required />
          </div>

          <div>
            <label style={labelStyle}>Бағасы:</label>
            <input type="text" placeholder="Мысалы: 45 000 ₸" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} required />
          </div>

          <div>
            <label style={labelStyle}>Категориясы:</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, backgroundColor: '#fff' }}>
              <option value="Сақина">Сақина</option>
              <option value="Алқа">Алқа</option>
              <option value="Сырға">Сырға</option>
              <option value="Білезік">Білезік</option>
              <option value="Аксессуар">Аксессуар</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Сурет (компьютерден таңдаңыз):</label>
            <input type="file" accept="image/*" onChange={handleFile} style={inputStyle} />
          </div>

          {preview && (
            <div style={{ gridColumn: 'span 2' }}>
              <img src={preview} alt="Алдын ала қарау"
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #ddd' }} />
            </div>
          )}

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Сипаттамасы:</label>
            <textarea rows={3} placeholder="Бұйым туралы қысқаша сипаттама" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
          </div>

          <div>
            <label style={labelStyle}>Металл:</label>
            <input type="text" placeholder="Мысалы: 585 пробалы алтын" value={form.metal}
              onChange={(e) => setForm({ ...form, metal: e.target.value })} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Тас:</label>
            <input type="text" placeholder="Мысалы: Табиғи гауһар" value={form.stone}
              onChange={(e) => setForm({ ...form, stone: e.target.value })} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Салмағы:</label>
            <input type="text" placeholder="Мысалы: 4.2 г" value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Кепілдік:</label>
            <input type="text" value={form.warranty}
              onChange={(e) => setForm({ ...form, warranty: e.target.value })} style={inputStyle} />
          </div>

          {error && <div style={{ gridColumn: 'span 2', color: '#d33', fontSize: '14px' }}>{error}</div>}

          <button type="submit" disabled={saving}
            style={{ gridColumn: 'span 2', background: saving ? '#bba24f' : '#D4AF37', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: saving ? 'default' : 'pointer', fontSize: '15px' }}>
            {saving ? 'Жүктелуде...' : '+ Сайтқа тауар қосу'}
          </button>
        </form>
      </div>

      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #eaeaea' }}>
        <h3 style={{ marginBottom: '20px', color: '#111' }}>📋 Сайттағы барлық бұйымдар ({products.length})</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fdfbf7', borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Суреті</th>
              <th style={{ padding: '12px' }}>Атауы</th>
              <th style={{ padding: '12px' }}>Категория</th>
              <th style={{ padding: '12px' }}>Бағасы</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Әрекет</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>
                  <img src={product.image} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                </td>
                <td style={{ padding: '10px', fontWeight: '600', color: '#111' }}>{product.title}</td>
                <td style={{ padding: '10px', color: '#666' }}>{product.category}</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#D4AF37' }}>{product.price}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button onClick={() => deleteProduct(product.id)}
                    style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                    🗑️ Өшіру
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
