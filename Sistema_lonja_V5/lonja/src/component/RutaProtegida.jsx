import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navegacion from "./layout/Navegacion";

export default function RutaProtegida() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  // ❌ No está logueado → al login
  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  // ✅ Si está logueado y entra a "/", lo redirigimos a /compra
  if (location.pathname === "/") {
    return <Navigate to="/compra" />;
  }

  return (
    <div className="grid contenedor contenido-principal">
      <Navegacion />
      <main className="caja-contenido col-9">
        <Outlet />
      </main>
    </div>
  );
}