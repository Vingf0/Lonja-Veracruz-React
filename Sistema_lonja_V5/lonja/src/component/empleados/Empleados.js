import React,{useEffect, useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';
import { Link } from 'react-router-dom';

const Empleados=()=> {

    //trabajar con el state
    //cliente=state,guardarClientes=almacena el state
    const [empleados,guardarEmpleados]=useState([])


    const consultarAPI=async()=>{
        const empleadosConsulta=await clienteAxios.get("/api/consultar-usuarios")

        //resultado en el state
        guardarEmpleados(empleadosConsulta.data)
    }

    //efect similar a componentidmount y wiilmount
    useEffect(()=>{
        consultarAPI()
    },[])
    return (
        <Fragment>
                <h2>Empleados</h2>
                    <Link to={"/empleado/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                        Nuevo Empleado
                    </Link>
                <ul className='listado-empleados'>
                    {empleados.map(empleado=>(
                        <Empleado 
                            key={empleado._id}
                            empleado={empleado}
                        />
                    ))}
                </ul>
        </Fragment>
    )
}

export default Empleados