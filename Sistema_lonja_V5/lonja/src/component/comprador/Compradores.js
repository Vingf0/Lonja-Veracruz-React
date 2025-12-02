import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Comprador from './Comprador';
import { Link } from 'react-router-dom';

const Compradores = () => {

    const [compradores, guardarCompradores] = useState([]);

    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/consulta-compradores");
            guardarCompradores(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Compradores</h2>

            <Link to={"/comprador/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo comprador
            </Link>

            <ul className='listado-compradores'>
                {compradores.map(comprador => (
                    <Comprador
                        key={comprador._id}
                        comprador={comprador}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Compradores;