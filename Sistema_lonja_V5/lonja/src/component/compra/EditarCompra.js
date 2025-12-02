import React,{Fragment,useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate,useParams } from 'react-router-dom';

function EditarCompra(props){
    const navigate = useNavigate();
    const {id}=useParams()
    const [compra,datosCompra]=useState([{
        precio_kilo_final:'',
        precio_total:'',
        fecha:'',
        comprador:'',
        lotes:''
    }])
    
    //useEffect
    useEffect(()=>{
         //Query para API
        const consultar_API=async ()=>{
        const compraConsulta=await clienteAxios.get(`api/consulta-compras-id/${id}`)
        //Agregar en el state
        datosCompra(compraConsulta.data)
        
        }
        consultar_API();
    },[id])
    //enviar por axios para actualizar cliente
    const actializarCompra= e =>{
         e.preventDefault();

         //enviar el axios

         clienteAxios.put(`/api/actualizar-compra/${compra._id}`,compra)
         .then(res=>{
                         //errores de mongodb
                         if(res.data.code===11000){
                              Swal.fire({
                                 type:"error",
                                 title: "Hubo un problema",
                                 text: "Compra no registrada",
                                 icon: "error"
                             });
                         }else{
                             Swal.fire({
                                 title: "Se actualzo la compra",
                                 text: res.data.mensaje,
                                 icon: "success"
                             });
                         }
                        navigate("/")
                     })         

    }

    //leer datos del formulario
    const actualizarState= e=>{
        //almacenando lo que el usuario escribe
        datosCompra({
            //copiar del state actual
            ...compra,
            [e.target.name] : e.target.value
        })        
    }
    const validarFormulario=()=>{
        const {precio_kilo_final,precio_total,fecha,comprador,lotes}=compra
        let validar=!precio_kilo_final?.length>0 || !precio_total?.length>0 || !fecha?.length>0 || !comprador?.length>0 || !lotes?.length>0;
        return validar

    }
    
    return (
        <Fragment>
        <h2>Editar Compra</h2>
            <form 
                onSubmit={actializarCompra}
            >
                    <legend>Llena todos los campos</legend>

                    <div className="campo">
                        <label>Precio kilo final:</label>
                        <input type="number" placeholder="Precio x Kilo Final Compra" name="precio_kilo_final"
                        onChange={actualizarState}
                        value={compra.precio_kilo_final}/>
                    </div>
                
                    <div className="campo">
                        <label>Precio total:</label>
                        <input type="number" placeholder="Precio Total Compra" name="precio_total"
                          onChange={actualizarState}
                          value={compra.precio_total}/>
                    </div>

                    <div className="campo">
                        <label>Fecha:</label>
                        <input type="date" placeholder="Fecha Compra" name="fecha"
                          onChange={actualizarState}
                          value={compra.fecha}/>
                    </div>

                    <div className="campo">
                        <label>Lotes:</label>
                        <input type="text" placeholder="Lotes Compra" name="lotes"
                          onChange={actualizarState}
                          value={compra.lotes}/>
                    </div>

                    <div className="campo">
                        <label>Comprador:</label>
                        <input type="text" placeholder="Comprador Compra" name="comprador"
                          onChange={actualizarState}
                          value={compra.comprador}/>
                    </div>

                    <div className="enviar">
                            <input type="submit" className="btn btn-azul" value="Modificar Compra"
                            disabled={validarFormulario()}/>
                    </div>

                </form>
            </Fragment>
    )
}

//función que toma un componente y retorna otro componente

export default EditarCompra