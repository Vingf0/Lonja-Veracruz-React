import React,{useEffect, useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Especie from './Especie';
import { Link } from 'react-router-dom';

const Especies = () => {

    const [especies, guardarEspecies] = useState([]);

    const consultarAPI = async () => {
        const especieConsulta = await clienteAxios.get("/api/consulta-especies");
        guardarEspecies(especieConsulta.data);
    };

    useEffect(() => {
        consultarAPI();
    }, []); // ← SOLO una vez

    return (
        <Fragment>
            <h2>Especies</h2>
            <Link to={"/especie/nueva"} className="btn btn-verde nva-especie">
                <i className="fas fa-plus-circle"></i>
                Nueva Especie
            </Link>

            <ul className='listado-especies'>
                {especies.map(especie => (
                    <Especie 
                        key={especie._id}
                        especie={especie}   // ← YA CORRECTO
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Especies;
