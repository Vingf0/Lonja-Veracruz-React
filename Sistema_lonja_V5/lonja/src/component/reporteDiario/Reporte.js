import { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import moment from 'moment'; 

function ReporteDiario() {

    // 1. STATE para la fecha seleccionada, la lista de compras y los totales calculados
    const [fecha, setFecha] = useState(moment().format('YYYY-MM-DD')); // Fecha de hoy por defecto
    
    // 💡 Eliminado: console.log(fecha)
    
    const [compras, setCompras] = useState([]);
    const [totales, setTotales] = useState({
        gananciaTotal: 0,
        kilosPorEspecie: {}
    });
    const [cargando, setCargando] = useState(false);


    // 2. useEffect para cargar los datos al cambiar la fecha
    useEffect(() => {
        const consultarReporteDiario = async () => {
            if (!fecha) {
                // Si la fecha está vacía, reseteamos y salimos
                setCompras([]);
                calcularTotales([]);
                return;
            }

            setCargando(true);
            try {
                // 📞 LLAMADA A LA API CORREGIDA:
                // Debes usar la fecha del estado 'fecha' en el query string
                const resultado = await clienteAxios.get(`/api/consulta-compras?fecha=${fecha}`);
                const data = resultado.data;
                
                setCompras(data);
                calcularTotales(data);

            } catch (error) {
                console.error("Error al cargar el reporte diario:", error);
                // Si hay un error, reseteamos los datos
                setCompras([]);
                setTotales({ gananciaTotal: 0, kilosPorEspecie: {} }); // Resetear totales
            }
            setCargando(false);
        };

        consultarReporteDiario();
    }, [fecha]); // Se ejecuta cada vez que 'fecha' cambia

    // 3. Función para procesar los datos y calcular totales
    const calcularTotales = (comprasData) => {
        let gananciaTotal = 0;
        const kilosPorEspecie = {};

        comprasData.forEach(compra => {
            // Sumar la ganancia total de las compras del día
            gananciaTotal += compra.precio_total;

            // Recorrer los lotes para sumar los kilos por especie
            compra.lotes.forEach(lote => {
                const nombreEspecie = lote.especie?.nombre || 'Desconocida';
                const kilosLote = lote.kilos || 0;
                
                // Sumar kilos
                kilosPorEspecie[nombreEspecie] = (kilosPorEspecie[nombreEspecie] || 0) + kilosLote;
            });
        });

        setTotales({
            gananciaTotal: gananciaTotal,
            kilosPorEspecie: kilosPorEspecie
        });
    };

    // 4. Manejar el cambio de la fecha
    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };


    // 5. Renderizado
    return (
        <Fragment>
            <h2>📅 Reporte Diario de Compras</h2>
            <p>Consulta el total de ventas, kilos por especie y el detalle de las compras por fecha.</p>

            <div className="campo fecha-selector">
                <label>Seleccionar Fecha:</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={handleFechaChange}
                    className="reporte-input-date"
                />
            </div>

            {/* --- Sección de Totales --- */}
            <div className="reporte-totales">
                {/* 🌟 MOSTRAR FECHA CORRECTA EN FORMATO LEGIBLE */}
                <h3>Resumen para la fecha: {fecha ? moment(fecha).format('DD/MM/YYYY') : 'Seleccione una fecha'}</h3>
                
                {cargando ? (
                    <p>Cargando totales...</p>
                ) : (
                    <>
                        <div className="total-box ganancia-total">
                            <h4>Ganancia Total del Día</h4>
                            <p className="total-value">${totales.gananciaTotal.toFixed(2)}</p>
                        </div>
                        
                        <div className="total-box kilos-especie">
                            <h4>Kilos Vendidos por Especie</h4>
                            <ul>
                                {Object.entries(totales.kilosPorEspecie).map(([especie, kilos]) => (
                                    <li key={especie}>
                                        <strong>{especie}:</strong> {kilos} Kg
                                    </li>
                                ))}
                            </ul>
                            {/* 💡 Mostrar mensaje solo si no hay kilos reportados Y SÍ hay compras (o si no hay compras) */}
                            {Object.keys(totales.kilosPorEspecie).length === 0 && compras.length > 0 && 
                                <p>No se encontraron datos de kilos por especie en estas compras.</p>
                            }
                        </div>
                    </>
                )}
            </div>

            <hr/>

            {/* --- Sección de Detalle de Compras --- */}
            <h3>Detalle de Compras ({compras.length})</h3>

            {cargando ? (
                <p>Cargando compras...</p>
            ) : compras.length === 0 ? (
                <p>No se encontraron compras para el día {moment(fecha).format('DD/MM/YYYY')}.</p>
            ) : (
                <ul className="lista-compras-reporte">
                    {compras.map(compra => (
                        <li key={compra._id} className="compra-item-reporte">
                            <h4>Compra ID: {compra._id.slice(-6)}</h4>
                            <p><strong>Comprador:</strong> {compra.comprador ? `${compra.comprador.nombre} ${compra.comprador.apellido_paterno}` : 'No especificado'}</p>
                            <p><strong>Total:</strong> ${compra.precio_total.toFixed(2)}</p>
                            <p><strong>Precio Final x Kilo:</strong> ${compra.precio_kilo_final}</p>

                            <h5>Lotes:</h5>
                            <ul className="lotes-detalle">
                                {compra.lotes.map(lote => (
                                    <li key={lote._id}>
                                        - {lote.kilos} Kg de **{lote.especie?.nombre || 'Especie Desconocida'}** (Lote: {lote.no_lote})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
}

export default ReporteDiario;