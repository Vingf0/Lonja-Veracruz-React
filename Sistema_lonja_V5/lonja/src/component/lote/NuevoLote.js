import React,{Fragment,useState} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function NuevoLote(props){
    const navigate = useNavigate();
  
    const [lote,guardarLote]=useState({
        kilos:'',
        numero_cajas:'',
        precio_kilo_salida:'',
        fecha:'',
        especie:''
    })
    //leer datos del formulario
    const actualizarState= e=>{
        //almacenando lo que el usuario escribe
        guardarLote({
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
    //agregar a api_rest
    const agregarLote=e=>{
        e.preventDefault()
        clienteAxios.post("/api/crear-lote",lote)
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
                        title: "Se agrego el lote",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                }
               navigate("/lotes")
            })
    }
    return (
        <Fragment>
        <h2>Nuevo Lote</h2>
            <form onSubmit={agregarLote}>
                    <legend>Llena todos los campos</legend>
                    <div className="campo">
                        <label>Kilos:</label>
                        <input type="number" placeholder="Kilos Lote" name="kilos"
                        onChange={actualizarState}/>
                    </div>
                
                    <div className="campo">
                        <label>Numero de Cajas:</label>
                        <input type="number" placeholder="Numero de cajas Lote" name="numero_cajas"
                          onChange={actualizarState}/>
                    </div>

                    <div className="campo">
                        <label>Precio x Kilo Salida:</label>
                        <input type="number" placeholder="Precio x Kilo Salida Lote" name="precio_kilo_salida"
                          onChange={actualizarState}/>
                    </div>

                    <div className="campo">
                        <label>Fecha:</label>
                        <input type="date" placeholder="Fecha Lote" name="fecha"
                          onChange={actualizarState}/>
                    </div>

                    <div className="campo">
                        <label>Especie:</label>
                        <input type="text" placeholder="Especie Lote" name="especie"
                          onChange={actualizarState}/>
                    </div>

                    <div className="enviar">
                            <input type="submit" className="btn btn-azul" value="Agregar Lote"
                            disabled={validarFormulario()}/>
                    </div>

                </form>
            </Fragment>
    )
}

//función que toma un componente y retorna otro componente

export default NuevoLote