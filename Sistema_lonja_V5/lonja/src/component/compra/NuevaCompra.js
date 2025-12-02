import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const NuevaCompra = () => {
    // --- STATE DEL COMPRADOR ---
    const [comprador, setComprador] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        direccion: "",
        correo: ""
    });

    // --- STATE DE LOTES ---
    const [lotes, setLotes] = useState([
        { kilos: "", numero_cajas: "", precio_kilo_salida: "", especie: "" }
    ]);

    // --- ESPECIES PARA EL SELECT ---
    const [especies, setEspecies] = useState([]);

    // Cargar especies desde la API
    useEffect(() => {
        const cargarEspecies = async () => {
            const res = await clienteAxios.get("/api/consulta-especies");
            setEspecies(res.data);
        };
        cargarEspecies();
    }, []);

    // Manejar cambios del comprador
    const actualizarComprador = (e) => {
        setComprador({
            ...comprador,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar cambios de los lotes
    const actualizarLote = (index, e) => {
        const nuevosLotes = [...lotes];
        nuevosLotes[index][e.target.name] = e.target.value;
        setLotes(nuevosLotes);
    };

    // Agregar nuevo lote
    const agregarLote = () => {
        setLotes([
            ...lotes,
            { kilos: "", numero_cajas: "", precio_kilo_salida: "", especie: "" },
        ]);
    };

    // Eliminar lote
    const eliminarLote = (index) => {
        const nuevosLotes = lotes.filter((_, i) => i !== index);
        setLotes(nuevosLotes);
    };

    // Enviar formulario
    const crearCompra = async (e) => {
        e.preventDefault();

        const datos = {
            compradorDatos: comprador,
            lotesDatos: lotes,
            precio_kilo_final: calcularPrecioFinal(),
            precio_total: calcularPrecioTotal()
        };

        try {
            const res = await clienteAxios.post("/api/crear-compra", datos);

            Swal.fire("Éxito", "Compra creada correctamente", "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "No se pudo crear la compra", "error");
        }
    };

    // Helpers de cálculo
    const calcularPrecioFinal = () => {
        if (lotes.length === 0) return 0;

        // Puedes ajustar esta lógica como quieras:
        return lotes[0].precio_kilo_salida;
    };

    const calcularPrecioTotal = () => {
        return lotes.reduce((total, lote) => {
            return total + (parseFloat(lote.kilos || 0) * parseFloat(lote.precio_kilo_salida || 0));
        }, 0);
    };

    return (
        <Fragment>
            <h2>Nueva Compra</h2>

            <form onSubmit={crearCompra}>
                <h3>Datos del comprador</h3>

                <div className="campo">
                    <label>Nombre</label>
                    <input name="nombre" onChange={actualizarComprador} value={comprador.nombre} />
                </div>

                <div className="campo">
                    <label>Apellido Paterno</label>
                    <input name="apellido_paterno" onChange={actualizarComprador} value={comprador.apellido_paterno} />
                </div>

                <div className="campo">
                    <label>Apellido Materno</label>
                    <input name="apellido_materno" onChange={actualizarComprador} value={comprador.apellido_materno} />
                </div>

                <div className="campo">
                    <label>Dirección</label>
                    <input name="direccion" onChange={actualizarComprador} value={comprador.direccion} />
                </div>

                <div className="campo">
                    <label>Correo</label>
                    <input name="correo" onChange={actualizarComprador} value={comprador.correo} />
                </div>

                <hr />

                <h3>Lotes</h3>

                {lotes.map((lote, index) => (
                    <div key={index} className="lote-card">
                        <h4>Lote {index + 1}</h4>

                        <div className="campo">
                            <label>Kilos</label>
                            <input
                                type="number"
                                name="kilos"
                                value={lote.kilos}
                                onChange={(e) => actualizarLote(index, e)}
                            />
                        </div>

                        <div className="campo">
                            <label>Número de cajas</label>
                            <input
                                type="number"
                                name="numero_cajas"
                                value={lote.numero_cajas}
                                onChange={(e) => actualizarLote(index, e)}
                            />
                        </div>

                        <div className="campo">
                            <label>Precio por kilo salida</label>
                            <input
                                type="number"
                                name="precio_kilo_salida"
                                value={lote.precio_kilo_salida}
                                onChange={(e) => actualizarLote(index, e)}
                            />
                        </div>

                        <div className="campo">
                            <label>Especie</label>
                            <select
                                name="especie"
                                value={lote.especie}
                                onChange={(e) => actualizarLote(index, e)}
                            >
                                <option value="">Seleccione una especie</option>
                                {especies
                                    .filter(esp => esp.estado === true)
                                    .map((esp) => (
                                        <option key={esp._id} value={esp._id}>
                                            {esp.nombre}
                                        </option>
                                ))}
                            </select>
                        </div>

                        <button type="button" className="btn btn-rojo" onClick={() => eliminarLote(index)}>
                            Eliminar lote
                        </button>

                        <hr />
                    </div>
                ))}

                <button type="button" className="btn btn-verde" onClick={agregarLote}>
                    Agregar lote
                </button>

                <hr />

                <h3>Resumen</h3>
                <p>Precio kilo final: {calcularPrecioFinal()}</p>
                <p>Precio total: {calcularPrecioTotal()}</p>

                <input type="submit" value="Crear compra" className="btn btn-azul" />
            </form>
        </Fragment>
    );
};

export default NuevaCompra;
