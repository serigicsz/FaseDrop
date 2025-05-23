import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        Predicción Escolar
      </div>
      <nav className="space-x-4">
        <Link to="/formulario" className="hover:underline">Formulario</Link>
        <Link to="/historial" className="hover:underline">Historial</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

export default Header;
