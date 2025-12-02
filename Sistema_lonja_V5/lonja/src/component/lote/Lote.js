import React from 'react';

function Lote({ lote }) {

    const {
        _id,
        kilos,
        numero_cajas,
        precio_kilo_salida,
        no_lote,
        fecha,
        especie
    } = lote;

    return (
        <li className="lote">
            <div className="info-lote">
                <p><strong>No. Lote:</strong> {no_lote}</p>
                <p><strong>Kilos:</strong> {kilos}</p>
                <p><strong>Cajas:</strong> {numero_cajas}</p>
                <p><strong>Precio/Kg Salida:</strong> ${precio_kilo_salida}</p>
                <p><strong>Fecha:</strong> {new Date(fecha).toLocaleString()}</p>

                <p>
                    <strong>Especie:</strong>{" "}
                    {especie ? especie.nombre : "No asignada"}
                </p>

                <p>
                    <strong>Tipo:</strong>{" "}
                    {especie && especie.tipo ? especie.tipo : "No disponible"}
                </p>
            </div>
        </li>
    );
}

export default Lote;
