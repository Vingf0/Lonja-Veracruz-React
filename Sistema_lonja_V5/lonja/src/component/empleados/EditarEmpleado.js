import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function EditarEmpleado() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Estado inicial CORRECTO (objeto, no array)
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    contraseña: "",
    rol: ""
  });

  useEffect(() => {
    const consultar_API = async () => {
      try {
        const res = await clienteAxios.get(`/api/consultar-usuario-id/${id}`);

        // Ajustar según tu backend:
        setEmpleado(res.data); 
        // Si el backend regresa {usuario: {...}}
        //setEmpleado(res.data.usuario);

      } catch (error) {
        console.log(error);
      }
    };

    consultar_API();
  }, [id]);

  const actualizarEmpleado = async (e) => {
    e.preventDefault();

    try {
      const res = await clienteAxios.put(
        `/api/editar-usuario/${empleado._id}`,
        empleado
      );

      if (res.data.code === 11000) {
        Swal.fire({
          title: "Error",
          text: "Ese correo ya está registrado",
          icon: "error"
        });
        return;
      }

      Swal.fire({
        title: "Empleado actualizado",
        text: res.data.mensaje,
        icon: "success"
      });

      navigate("/empleado");

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  const actualizarState = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value
    });
  };

  const validarFormulario = () => {
    const { nombre, apellido_paterno, apellido_materno, telefono, correo, rol } =
      empleado;

    return (
      !nombre ||
      !apellido_paterno ||
      !apellido_materno ||
      !telefono ||
      !correo ||
      !rol
    );
  };

  return (
    <Fragment>
      <h2>Editar Empleado</h2>

      <form onSubmit={actualizarEmpleado}>
        <legend>Llena los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={actualizarState}
            value={empleado.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido paterno:</label>
          <input
            type="text"
            placeholder="Apellido paterno"
            name="apellido_paterno"
            onChange={actualizarState}
            value={empleado.apellido_paterno}
          />
        </div>

        <div className="campo">
          <label>Apellido materno:</label>
          <input
            type="text"
            placeholder="Apellido materno"
            name="apellido_materno"
            onChange={actualizarState}
            value={empleado.apellido_materno}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            onChange={actualizarState}
            value={empleado.telefono}
          />
        </div>

        <div className="campo">
          <label>Correo:</label>
          <input
            type="email"
            placeholder="Correo"
            name="correo"
            onChange={actualizarState}
            value={empleado.correo}
          />
        </div>

        <div className="campo">
          <label>Contraseña (solo si deseas cambiarla):</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            name="contraseña"
            onChange={actualizarState}
            value={empleado.contraseña}
          />
        </div>

        <div className="campo">
          <label>Rol:</label>
          <select name="rol" onChange={actualizarState} value={empleado.rol}>
            <option value="">-- Selecciona un rol --</option>
            <option value="admin">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Modificar Empleado"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default EditarEmpleado;
