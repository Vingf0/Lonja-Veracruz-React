import React,{Fragment,useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate,useParams } from 'react-router-dom';

function EditarLote(props){
    const navigate = useNavigate();
    const {id}=useParams()
    const [lote,datosLote]=useState([{
        kilos:'',
        numero_cajas:'',
        precio_kilo_salida:'',
        fecha:'',
        especie:''
    }])
    
    //useEffect
    useEffect(()=>{
         //Query para API
        const consultar_API=async ()=>{
        const loteConsulta=await clienteAxios.get(`api/consulta-lotes-id/${id}`)
        //Agregar en el state
        datosLote(loteConsulta.data)
        
        }
        consultar_API();
    },[id])
    //enviar por axios para actualizar cliente
    const actializarLote= e =>{
         e.preventDefault();

         //enviar el axios

         clienteAxios.put(`/api/actualizar-lote/${lote._id}`,lote)
         .then(res=>{
                         //errores de mongodb
                         if(res.data.code===11000){
                              Swal.fire({
                                 type:"error",
                                 title: "Hubo un problema",
                                 text: "Lote no registrado",
                                 icon: "error"
                             });
                         }else{
                             Swal.fire({
                                 title: "Se actualzo el lote",
                                 text: res.data.mensaje,
                                 icon: "success"
                             });
                         }
                        navigate("/lotes")
                     })         

    }

    //leer datos del formulario
    const actualizarState= e=>{
        //almacenando lo que el usuario escribe
        datosLote({
            //copiar del state actual
            ...lote,
            [e.target.name] : e.target.value
        })        
    }
    const validarFormulario=()=>{
        const {kilos,numero_cajas,precio_kilo_salida,fecha,especie}=lote
        let validar=!kilos?.length>0 || !numero_cajas?.length>0 || !precio_kilo_salida?.length>0 || !fecha?.length>0 || !especie?.length>0;
        return validar

    }
    
    return (
        <Fragment>
        <h2>Editar Lote</h2>
            <form 
                onSubmit={actializarLote}
            >
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Kilos:</label>
                        <input type="number" placeholder="Kilos Lote" name="kilos"
                        onChange={actualizarState}
                        value={lote.kilos}/>
                    </div>
                
                    <div className="campo">
                        <label>Numero de Cajas:</label>
                        <input type="number" placeholder="Numero de cajas Lote" name="numero_cajas"
                          onChange={actualizarState}
                          value={lote.numero_cajas}/>
                    </div>

                    <div className="campo">
                        <label>Precio x Kilo Salida:</label>
                        <input type="number" placeholder="Precio x Kilo Salida Lote" name="precio_kilo_salida"
                          onChange={actualizarState}
                          value={lote.precio_kilo_salida}/>
                    </div>

                    <div className="campo">
                        <label>Fecha:</label>
                        <input type="date" placeholder="Fecha Lote" name="fecha"
                          onChange={actualizarState}
                          value={lote.fecha}/>
                    </div>

                    <div className="campo">
                        <label>Especie:</label>
                        <input type="text" placeholder="Especie Lote" name="especie"
                          onChange={actualizarState}
                          value={lote.especie}/>
                    </div>

                    <div className="enviar">
                            <input type="submit" className="btn btn-azul" value="Modificar Lote"
                            disabled={validarFormulario()}/>
                    </div>

                </form>
            </Fragment>
    )
}

//función que toma un componente y retorna otro componente

export default EditarLote