import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const eliminarComprador = (id) => {

    Swal.fire({
        title: "¿Seguro de eliminar?",
        text: "Una vez eliminado no se puede recuperar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then(result => {

        if (result.isConfirmed) {
            clienteAxios.delete(`/api/eliminar-comprador/${id}`)
                .then(() => {
                    Swal.fire(
                        "Eliminado",
                        "El comprador ha sido eliminado",
                        "success"
                    );
                })
                .catch(err => console.log(err));
        }
    });
};


function Comprador({ comprador }) {

    const { _id, nombre, apellido_paterno, apellido_materno, direccion, correo } = comprador;

    return (
        <li className="comprador">
            <div className="info-comprador">
                <p className="nombre">Nombre: {nombre} {apellido_paterno} {apellido_materno}</p>
                <p className="direccion">Dirección: {direccion}</p>
                <p className="correo">Correo: {correo}</p>
            </div>

            <div className="acciones">
                <Link to={`/comprador/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarComprador(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default Comprador;
