import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const eliminarCompra = (id, actualizarCompras) => { 
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Este cambio no es reversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.delete(`/api/eliminar-compra/${id}`)
                .then(() => {
                    Swal.fire("Eliminada", "La compra fue eliminada", "success");
                    if (actualizarCompras) {
                        actualizarCompras(); 
                    }
                })
                .catch(error => {
                    Swal.fire("Error", "No se pudo eliminar la compra.", "error");
                    console.error("Error al eliminar la compra:", error);
                });
        }
    });
};
function Compra({ compra }) {

    const {
        _id,
        precio_kilo_final,
        precio_total,
        fecha,
        comprador,
        lotes
    } = compra;

    return (
        <li className="compra">
            <div className="info-compra">

                <p><strong>Precio x Kilo: $</strong>{precio_kilo_final}</p>
                <p><strong>Total: $</strong>{(precio_total).toFixed(2)}</p>
                <p><strong>Fecha:</strong> {new Date(fecha).toLocaleDateString()}</p>

                {/* MOSTRAR COMPRADOR */}
                {comprador && (
                    <p>
                        <strong>Comprador:</strong> 
                        {` ${comprador.nombre} ${comprador.apellido_paterno}`}
                    </p>
                )}

                {/* MOSTRAR LOTES */}
                <p><strong>Lotes:</strong></p>
                <ul>
                    {lotes.map(lote => (
                        <li key={lote._id}>
                            <strong>No. Lote:</strong> {lote.no_lote} <br />
                            <strong>Kilos:</strong> {lote.kilos} <br />
                            <strong>Precio x kilo (salida): $</strong>{lote.precio_kilo_salida} <br />
                            <strong>Especie:</strong> {lote.especie?.nombre}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCompra(_id)}
                >
                    <i className="fas fa-times"></i> Eliminar
                </button>
            </div>
        </li>
    );
}

export default Compra;