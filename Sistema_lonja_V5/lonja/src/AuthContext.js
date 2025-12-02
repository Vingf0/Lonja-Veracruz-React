import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    nombre: localStorage.getItem("nombre") || null,
    rol: localStorage.getItem("rol") || null
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre", data.nombre);
    localStorage.setItem("rol", data.rol);

    setAuth({
      token: data.token,
      nombre: data.nombre,
      rol: data.rol
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      token: null,
      nombre: null,
      rol: null
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
