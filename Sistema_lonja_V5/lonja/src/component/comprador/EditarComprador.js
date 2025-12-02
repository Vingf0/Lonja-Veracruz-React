import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';

function EditarComprador() {

    const navigate = useNavigate();
    const { id } = useParams(); // Extrae el ID de la URL

    // 1. STATE para almacenar los datos del comprador
    const [comprador, setComprador] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        direccion: '',
        correo: ''
    });

    // 2. useEffect para cargar los datos del comprador
    useEffect(() => {
        const consultarAPI = async () => {
            try {
                // 📞 Llamada a la API para obtener los datos del comprador por ID
                const compradorConsulta = await clienteAxios.get(`/api/consulta-comprador-id/${id}`);
                
                // 🔄 Asigna los datos obtenidos al state, autocompletando el formulario
                setComprador(compradorConsulta.data);

            } catch (error) {
                console.error("Error al cargar datos del comprador:", error);
                // Opcional: Mostrar un mensaje de error si no se encuentra el comprador
            }
        };

        consultarAPI();
    }, [id]); // Dependencia [id] para que se ejecute si el ID cambia

    // 3. Función para actualizar el state al escribir en el formulario
    const actualizarState = e => {
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value
        });
    };

    // 4. Función que se ejecuta al enviar el formulario (PUT request)
    const actualizarComprador = e => {
        e.preventDefault();

        // 📞 Llamada a la API para actualizar el comprador
        clienteAxios.put(`/api/actualizar-comprador/${id}`, comprador) // Usamos la ruta genérica de edición
            .then(res => {
                
                // Manejo de errores específicos (ej. duplicidad de correo)
                if (res.data.code === 11000) { 
                    Swal.fire({
                        title: "Error de Duplicidad",
                        text: "El correo ya está registrado por otro comprador.",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Comprador Actualizado",
                        text: res.data.mensaje || "Los datos del comprador se han modificado.",
                        icon: "success"
                    }).then(() => {
                        navigate("/compradores"); // Redirige a la lista de compradores
                    });
                }
            })
            .catch(error => {
                 console.error("Error al actualizar:", error);
                 Swal.fire("Error", "No se pudo actualizar el comprador.", "error");
            });
    };

    // 5. Función para deshabilitar el botón si faltan campos esenciales
    const validarFormulario = () => {
        // Asumiendo que todos los campos son obligatorios
        const { nombre, apellido_paterno, apellido_materno, direccion, correo } = comprador;
        return !(nombre && apellido_paterno && apellido_materno && direccion && correo);
    };


    // 6. Si el comprador aún no se ha cargado (ej. al inicio), muestra un loader
    if (!comprador.nombre) {
        return <h2>Cargando datos...</h2>; 
    }

    return (
        <Fragment>
            <h2>Editar Comprador: {comprador.nombre} {comprador.apellido_paterno}</h2>

            <form onSubmit={actualizarComprador}>

                <legend>Modificar los datos del comprador</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        onChange={actualizarState}
                        value={comprador.nombre} // 👈 Autocompletado
                    />
                </div>

                <div className="campo">
                    <label>Apellido Paterno:</label>
                    <input
                        type="text"
                        placeholder="Apellido Paterno"
                        name="apellido_paterno"
                        onChange={actualizarState}
                        value={comprador.apellido_paterno} // 👈 Autocompletado
                    />
                </div>
                
                <div className="campo">
                    <label>Apellido Materno:</label>
                    <input
                        type="text"
                        placeholder="Apellido Materno"
                        name="apellido_materno"
                        onChange={actualizarState}
                        value={comprador.apellido_materno} // 👈 Autocompletado
                    />
                </div>

                <div className="campo">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        onChange={actualizarState}
                        value={comprador.direccion} // 👈 Autocompletado
                    />
                </div>
                
                <div className="campo">
                    <label>Correo:</label>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        name="correo"
                        onChange={actualizarState}
                        value={comprador.correo} // 👈 Autocompletado
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarFormulario()}
                    />
                </div>

            </form>
        </Fragment>
    );
}

export default EditarComprador;