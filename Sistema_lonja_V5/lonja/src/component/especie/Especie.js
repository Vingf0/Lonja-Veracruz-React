import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const CambiarEstadoEspecie = (id) => {
    Swal.fire({
        title: "¿Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cambiar estado"
    }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.put(`/api/cambiar-estado-especie/${id}`)
                .then(() => {
                    Swal.fire({
                        title: "Cambio efectuado",
                        text: "La especie ha sido actualizada",
                        icon: "success"
                    });
                });
        }
    });
};

function Especie({ especie }) {
    const { _id, nombre, imagen, tipo, estado } = especie;

    return (
        <li className="especie">
            <div className="info-especie">
                <p className="nombre">Nombre: {nombre}</p>
                <p className="imagen">Imagen: {imagen}</p>
                <p className="tipo">Tipo: {tipo?.nombre}</p>
                <p className="estado">Estado: {estado ? "Activo" : "Inactivo"}</p>
            </div>

            <div className="acciones">
                <Link to={`/especie/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Especie
                </Link>

                <button
                    type="button"
                    className="btn btn-amarillo btn-estado"
                    onClick={() => CambiarEstadoEspecie(_id)}
                >
                    <i></i>
                    Activar/Desactivar Especie
                </button>
            </div>
        </li>
    );
}

export default Especie;
