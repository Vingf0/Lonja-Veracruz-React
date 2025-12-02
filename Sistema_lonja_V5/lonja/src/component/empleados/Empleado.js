import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios';

const eliminarEmpleado= id=>{
    console.log(id)
    Swal.fire({
    title: "Estas seguro de eliminar al empleado",
    text: "Una vez eliminado ya no se puede recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar empleado"
    }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.delete(`/api/eliminar-usuario/${id}`)
                .then(res=>{
                    Swal.fire({
                        title: "Eleminado!",
                        text: "El registro a sido eliminado.",
                        icon: "success"
                });

            })
        }
        
    });
}

function Empleado({empleado}){
 const {_id,nombre,apellido_paterno,apellido_materno,telefono,correo,rol}=empleado    
   return(
     <li className="empleado">
        <div className="info-empleado">
            <p className="nombre">Nombre: {nombre}</p>
            <p className="apellido_paterno">Apellido paterno: {apellido_paterno}</p>
            <p className="apellido_materno">Apellido materno: {apellido_materno}</p>
            <p className="telefono">Telefono: {telefono}</p>
            <p className="correo">Correo: {correo}</p>
            <p className="rol">Rol: {rol}</p>
        </div>
        <div className="acciones">
            <Link to={`/empleado/editar/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar empleado
            </Link>
            <button type="button" className="btn btn-rojo btn-eliminar"
                    onClick={()=>eliminarEmpleado(_id)}>
                <i className="fas fa-times"></i>
                Eliminar empleado
            </button>
        </div>
    </li>
   )
}
export default Empleado