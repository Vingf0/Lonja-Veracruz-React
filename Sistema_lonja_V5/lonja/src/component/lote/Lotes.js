import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Lote from './Lote';

const Lotes = () => {

    const [lotes, guardarLotes] = useState([]);

    const consultarAPI = async () => {
        const respuesta = await clienteAxios.get("/api/consulta-lotes");
        guardarLotes(respuesta.data);
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Lotes</h2>

            <ul className="listado-lotes">
                {lotes.map(lote => (
                    <Lote
                        key={lote._id}
                        lote={lote}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Lotes;
