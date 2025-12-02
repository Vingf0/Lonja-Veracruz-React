import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NuevoEmpleado() {
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    contraseña: "",
    rol: "vendedor" // default
  });

  // Actualiza los campos
  const actualizarState = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  // Validación simple
  const validarFormulario = () => {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      telefono,
      correo,
      contraseña,
      rol,
    } = empleado;

    return (
      !nombre ||
      !apellido_paterno ||
      !apellido_materno ||
      !telefono ||
      !correo ||
      !contraseña ||
      !rol
    );
  };

  // Enviar a API
  const agregarEmpleado = async (e) => {
    e.preventDefault();

    try {
      const resultado = await clienteAxios.post("/api/crear-usuario", empleado);

      Swal.fire({
        title: "Empleado registrado",
        text: resultado.data.mensaje,
        icon: "success",
      });

      navigate("/empleado"); // o a donde quieras
    } catch (error) {
      Swal.fire({
        title: "Hubo un error",
        text: "No se pudo registrar el empleado",
        icon: "error",
      });
    }
  };

  return (
    <Fragment>
      <h2>Nuevo Empleado</h2>

      <form onSubmit={agregarEmpleado}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={actualizarState}
            value={empleado.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido paterno:</label>
          <input
            type="text"
            name="apellido_paterno"
            placeholder="Apellido paterno"
            onChange={actualizarState}
            value={empleado.apellido_paterno}
          />
        </div>

        <div className="campo">
          <label>Apellido materno:</label>
          <input
            type="text"
            name="apellido_materno"
            placeholder="Apellido materno"
            onChange={actualizarState}
            value={empleado.apellido_materno}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            onChange={actualizarState}
            value={empleado.telefono}
          />
        </div>

        <div className="campo">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            onChange={actualizarState}
            value={empleado.correo}
          />
        </div>

        <div className="campo">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={actualizarState}
            value={empleado.contraseña}
          />
        </div>

        <div className="campo">
          <label>Rol:</label>
          <select
            name="rol"
            onChange={actualizarState}
            value={empleado.rol}
          >
            <option value="admin">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar empleado"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoEmpleado;
