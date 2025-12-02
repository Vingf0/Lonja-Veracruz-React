import {useEffect, useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Tipo from './Tipo';
const Tipos=()=> {

    //trabajar con el state
    //cliente=state,guardarClientes=almacena el state
    const [tipos,guardarTipos]=useState([])


    const consultarAPI=async()=>{
        const tipoConsulta=await clienteAxios.get("/api/consulta-tipos")

        //resultado en el state
        guardarTipos(tipoConsulta.data)
    }

    //efect similar a componentidmount y wiilmount
    useEffect(()=>{
        consultarAPI()
    },[tipos])
    return (
        <Fragment>
                <h2>Tipos</h2>
                <ul className='listado-tipos'>
                    {tipos.map(tipo=>(
                        <Tipo 
                            key={tipo._id}
                            tipo={tipo}
                        />
                    ))}
                </ul>

        </Fragment>
        

    )
}

export default Tipos