import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Formulario from './components/Formulario';
import Historial from './components/Historial';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Mostrar Header solo si el usuario está logueado */}
        {user && <Header />}

        <ToastContainer />

        <main className="flex-1 p-4">
          <Routes>
            {/* Si no hay usuario, muestra Login y Register */}
            {!user ? (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Si intenta ir a otra ruta sin estar logueado, redirige a login */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/formulario" element={<Formulario />} />
                <Route path="/historial" element={<Historial />} />
                {/* Si intenta ir a login/register estando logueado, redirige al formulario */}
                <Route path="*" element={<Navigate to="/formulario" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
