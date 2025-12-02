import React, { Fragment, useState } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NuevoComprador() { // Eliminé 'props' ya que no se usa
    const navigate = useNavigate();
  
    // 1. STATE: Usamos la función de renombrado de destructuración estándar
    const [comprador, setComprador] = useState({ 
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        direccion: '',
        correo: ''
    });

    // 2. FUNCIÓN PARA ACTUALIZAR EL STATE
    const actualizarState = e => {
        setComprador({
            // Copiar del state actual
            ...comprador,
            // Usa el atributo 'name' del input para actualizar la propiedad correcta del state
            [e.target.name]: e.target.value
        });        
    };

    // 3. FUNCIÓN PARA VALIDAR EL FORMULARIO
    const validarFormulario = () => {
        const { nombre, apellido_paterno, apellido_materno, direccion, correo } = comprador;
        
        // Retorna TRUE si CUALQUIER campo está vacío (lo que deshabilita el botón)
        // Usamos String.trim() para evitar espacios vacíos
        const esInvalido = [nombre, apellido_paterno, apellido_materno, direccion, correo]
                            .some(campo => campo.trim() === '');
        
        return esInvalido; // 'true' si es inválido (deshabilitado), 'false' si es válido (habilitado)
    };
    
    // 4. FUNCIÓN PARA ENVIAR EL FORMULARIO
    const agregarComprador = e => {
        e.preventDefault();

        // 📞 Llamada a la API POST
        clienteAxios.post("/api/crear-comprador", comprador)
            .then(res => {
                
                // Errores de duplicidad de MongoDB (código 11000)
                if (res.data.code === 11000) {
                     Swal.fire({
                        title: "Error de Duplicidad",
                        text: "El correo ya está registrado por otro comprador.",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Comprador Agregado",
                        text: res.data.mensaje || "El comprador se ha creado correctamente.",
                        icon: "success"
                    });
                }
                
               navigate("/compradores"); // Redirige a la lista
            })
            .catch(error => {
                console.error("Error al crear comprador:", error);
                Swal.fire("Error", "No se pudo crear el comprador.", "error");
            });
    };

    return (
        <Fragment>
            <h2>Nuevo Comprador</h2>
            <form onSubmit={agregarComprador}>
                <legend>Llena todos los campos</legend>
                
                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Comprador" 
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Apellido Paterno:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Paterno Comprador" 
                        name="apellido_paterno"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido Materno:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Materno Comprador" 
                        name="apellido_materno"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Dirección:</label>
                    <input 
                        type="text" 
                        placeholder="Dirección Comprador" 
                        name="direccion"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Correo:</label>
                    <input 
                        type="email" 
                        placeholder="Correo Comprador" 
                        name="correo"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Comprador"
                        // El botón se deshabilita si validarFormulario() retorna true
                        disabled={validarFormulario()} 
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoComprador;