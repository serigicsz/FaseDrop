import { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear el proveedor (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (usuario) => {
    setUser(usuario);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
