import React,{useEffect, useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Compra from './Compra';
import { Link } from 'react-router-dom';

const Compras = () => {

    const [compras, guardarCompras] = useState([]);

    const consultarAPI = async () => {
        const comprasConsulta = await clienteAxios.get("/api/consulta-compras");
        guardarCompras(comprasConsulta.data);
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Compras</h2>

            <Link to={"/compra/nueva"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nueva compra
            </Link>

            <ul className='listado-compras'>
                {compras.map(compra => (
                    <Compra 
                        key={compra._id}
                        compra={compra}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Compras;
