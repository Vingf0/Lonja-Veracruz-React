import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NuevaEspecie() {
    const navigate = useNavigate();

    const [especie, guardarEspecie] = useState({
        nombre: "",
        imagen: "",
        tipo: "",
        estado: "true"
    });

    const [tipos, setTipos] = useState([]);

    // Cargar lista de tipos desde backend
    useEffect(() => {
        const obtenerTipos = async () => {
            const respuesta = await fetch("/api/consulta-tipos");
            setTipos(respuesta.data);
        };
        obtenerTipos();
    }, []);

    // Manejar cambios del formulario
    const actualizarState = (e) => {
        guardarEspecie({
            ...especie,
            [e.target.name]: e.target.value
        });
    };

    const validarFormulario = () => {
        const { nombre, tipo } = especie;
        return !nombre || !tipo; // imagen no es requerida, estado tiene default
    };

    // Enviar a API
    const agregarEspecie = (e) => {
        e.preventDefault();

        clienteAxios
            .post("/api/crear-especie", especie)
            .then((res) => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        title: "Hubo un problema",
                        text: "La especie ya existe",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Especie creada",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                }
                navigate("/especies");
            })
            .catch(() => {
                Swal.fire("Error", "No se pudo crear la especie", "error");
            });
    };

    return (
        <Fragment>
            <h2>Nueva Especie</h2>

            <form onSubmit={agregarEspecie}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre de la Especie"
                        name="nombre"
                        onChange={actualizarState}
                        value={especie.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Imagen (URL):</label>
                    <input
                        type="text"
                        placeholder="URL de Imagen"
                        name="imagen"
                        onChange={actualizarState}
                        value={especie.imagen}
                    />
                </div>

                <div className="campo">
                    <label>Tipo:</label>

                    <select
                        name="tipo"
                        onChange={actualizarState}
                        value={especie.tipo}
                    >
                        <option value="">-- Seleccionar Tipo --</option>

                        {tipos.map((t) => (
                            <option key={t._id} value={t._id}>
                                {t.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Estado:</label>

                    <select
                        name="estado"
                        onChange={actualizarState}
                        value={especie.estado}
                    >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Especie"
                        disabled={validarFormulario()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevaEspecie;
