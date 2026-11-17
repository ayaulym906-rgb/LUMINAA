import { useState, useEffect } from 'react';

export default function Card({ item, onAdd }) {
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  const showImage = item.image && !imgError;

  // Escape басқанда терезе жабылады
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const imageBlock = showImage ? (
    <img
      src={item.image}
      alt={item.title}
      className="card-img"
      onError={() => setImgError(true)}
    />
  ) : (
    <span>{item.icon || '💎'}</span>
  );

  return (
    <>
      <div className="card card-clickable" onClick={() => setOpen(true)}>
        <div className="card-image-wrap">{imageBlock}</div>

        <div className="card-content">
          <h3>{item.title}</h3>
          <p className="card-price">{item.price}</p>
          <button
            className="btn-add"
            onClick={(e) => {
              e.stopPropagation(); // батырма терезені ашпасын
              onAdd();
            }}
          >
            Себетке қосу
          </button>
          <p className="card-more">Толығырақ көру ➔</p>
        </div>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <div className="modal-image">{imageBlock}</div>

            <div className="modal-body">
              <h2>{item.title}</h2>
              <p className="card-price">{item.price}</p>

              {item.specs && (
                <table className="modal-specs">
                  <tbody>
                    <tr><td>Материал</td><td>{item.specs.material}</td></tr>
                    <tr><td>Салмағы</td><td>{item.specs.weight}</td></tr>
                    <tr><td>Тас</td><td>{item.specs.stone}</td></tr>
                    <tr><td>Өлшемі</td><td>{item.specs.size}</td></tr>
                  </tbody>
                </table>
              )}

              <button
                className="btn-add"
                onClick={() => {
                  onAdd();
                  setOpen(false);
                }}
              >
                Себетке қосу
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}