import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';

function EditarEspecie() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [especie, setEspecie] = useState({
        nombre: '',
        imagen: '',
        tipo: '',
        estado: ''
    });

    const [tipos, setTipos] = useState([]); // ← LISTA DE TIPOS

    // Obtener especie + tipos
    useEffect(() => {

        const consultar_API = async () => {
            try {
                // 1️⃣ Obtener la especie
                const especieConsulta = await clienteAxios.get(`/api/consulta-especies-id/${id}`);
                setEspecie(especieConsulta.data);

                // 2️⃣ Obtener tipos
                const tiposConsulta = await clienteAxios.get(`/api/consulta-tipos`);
                setTipos(tiposConsulta.data);

            } catch (error) {
                console.log(error);
            }
        };

        consultar_API();

    }, [id]);

    const actualizarState = e => {
        setEspecie({
            ...especie,
            [e.target.name]: e.target.value
        });
    };

    const actializarEspecie = e => {
        e.preventDefault();

        clienteAxios.put(`/api/actualizar-especie/${especie._id}`, especie)
            .then(res => {

                if (res.data.code === 11000) {
                    Swal.fire({
                        title: "Hubo un problema",
                        text: "Especie no registrada",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Se actualizó la especie",
                        text: res.data.mensaje,
                        icon: "success"
                    }).then(() => {
                        navigate("/especies");
                    });
                }
            });
    };

    const validarFormulario = () => {
        const { nombre, imagen, tipo, estado } = especie;
        return !(nombre && imagen && tipo && estado);
    };

    return (
        <Fragment>
            <h2>Editar Especie</h2>

            <form onSubmit={actializarEspecie}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Especie"
                        name="nombre"
                        onChange={actualizarState}
                        value={especie.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Imagen (URL):</label>
                    <input
                        type="text"
                        placeholder="URL Imagen"
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
                        value={especie.tipo}   // ← PRESELECCIONA AUTOMÁTICO
                    >
                        <option value="">-- Selecciona un tipo --</option>

                        {tipos.map(t => (
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
                        <option value="">-- Selecciona estado --</option>
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Modificar Especie"
                        disabled={validarFormulario()}
                    />
                </div>

            </form>
        </Fragment>
    );
}

export default EditarEspecie;