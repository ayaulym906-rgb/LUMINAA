import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Бет табылмады</h1>
      <p>Сіз іздеген мекенжай қолжетімсіз немесе жоқ.</p>
      <Link to="/">Басты бетке қайту</Link>
    </div>
  );
}