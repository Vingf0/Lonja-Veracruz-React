import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navegacion() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar-nav">
      
      {/* Contenedor de enlaces principales */}
      <div className="nav-links-container">
        {auth?.rol === "admin" && (
          <>
            <a href="/compra" className="nav-link">Compras</a>
            <a href="/reporte" className="nav-link">Reporte diario</a>
            <a href="/compradores" className="nav-link">Compradores</a>
            <a href="/lotes" className="nav-link">Lotes</a>
            <a href="/especies" className="nav-link">Especies</a>
            <a href="/tipos" className="nav-link">Tipos</a>
            <a href="/empleado" className="nav-link">Empleados</a>

          </>
        )}

        {auth?.rol === "vendedor" && (
          <>
            <a href="/compra" className="nav-link">Compras</a>
            <a href="/reporte" className="nav-link">Reporte diario</a>
            <a href="/compradores" className="nav-link">Compradores</a>
            <a href="/lotes" className="nav-link">Lotes</a>
          </>
        )}
      </div>

      {/* Botón Logout, fuera del contenedor de enlaces para posicionarlo abajo */}
      <button
        onClick={handleLogout}
        className="logout-button"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}