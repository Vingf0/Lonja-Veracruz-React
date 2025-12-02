import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [contraseña, setPassword] = useState("");

  const navigate = useNavigate()

  const enviarLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://lonja-api.onrender.com/api/validar-credenciales", {
        correo,
        contraseña
      });

      login(data); // 👉 Guarda token+rol

      //window.location.href = "/"; // Redirigir al menú
      navigate("/");

      console.log(data)
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    // 🎨 Clase principal para centrar el formulario en la página
    <div className="login-page"> 
      
      {/* 🎨 Contenedor del formulario con estilos de tarjeta */}
      <div className="login-card"> 
        <h2 className="login-title">Iniciar sesión</h2>

        <form onSubmit={enviarLogin} className="login-form">
          <div className="input-group"> {/* 🎨 Agrupador para input y posibles etiquetas */}
            <input 
              type="email" 
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="login-input"
              required // Asegura que se complete
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required // Asegura que se complete
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
