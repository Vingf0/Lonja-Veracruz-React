import { lote } from "../models/lote.js";
import { especie } from "../models/especie.js"; // Para validar que exista la especie


// Crear lote
const crearLote = async (req, res) => {
    try {
        const {
            kilos,
            numero_cajas,
            precio_kilo_salida,
            fecha,
            especie: especieId,
            no_lote
        } = req.body;

        // Validaciones básicas
        if (!kilos || !numero_cajas || !precio_kilo_salida || !especieId || !no_lote) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Validar especie existente
        const especieExiste = await especie.findById(especieId);
        if (!especieExiste) {
            return res.status(404).json({ mensaje: "La especie no existe" });
        }

        // Evitar duplicación de no_lote si así lo quieres manejar
        const loteExistente = await lote.findOne({ no_lote });
        if (loteExistente) {
            return res.status(400).json({ mensaje: "El número de lote ya existe" });
        }

        const nuevoLote = new lote({
            kilos,
            numero_cajas,
            precio_kilo_salida,
            fecha: fecha || Date.now(),
            especie: especieId,
            no_lote
        });

        await nuevoLote.save();

        res.status(201).json({
            mensaje: "Lote creado correctamente",
            lote: nuevoLote
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear lote" });
    }
};

const consultarLotes = async (req, res) => {
    try {
        const lotes = await lote.find()
            .populate("especie", "nombre tipo");

        res.json(lotes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al consultar los lotes" });
    }
};

export { crearLote,
        consultarLotes
 };
