// controllers/compraController.js
import { comprador } from "../models/comprador.js";
import { lote } from "../models/lote.js";
import { compra } from "../models/compra.js";
import { especie } from "../models/especie.js";

// Función para generar número de lote único por día
function generarNumeroLote() {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `L${fecha}-${random}`;
}

const crearCompra = async (req, res) => {
    try {
        const { compradorDatos, lotesDatos, precio_kilo_final, precio_total } = req.body;

        if (!compradorDatos || !lotesDatos || lotesDatos.length === 0) {
            return res.status(400).json({ mensaje: "Datos incompletos" });
        }

        // 1. Crear o recuperar comprador
        let compradorDB = await comprador.findOne({ correo: compradorDatos.correo });

        if (!compradorDB) {
            compradorDB = await comprador.create(compradorDatos);
        }

        // 2. Crear lotes
        const lotesCreados = [];

        for (let loteData of lotesDatos) {
            const nuevoLote = new lote({
                ...loteData,
                no_lote: generarNumeroLote()
            });

            const loteGuardado = await nuevoLote.save();
            lotesCreados.push(loteGuardado._id);
        }

        // 3. Crear compra
        const nuevaCompra = await compra.create({
            comprador: compradorDB._id,
            lotes: lotesCreados,
            precio_kilo_final,
            precio_total,
        });

        res.json({
            mensaje: "Compra registrada correctamente",
            compra: nuevaCompra
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error interno", error });
    }
};

const consultarCompras = async (req, res) => {
    try {
        const compras = await compra
            .find()
            .populate("comprador")     // trae los datos del comprador
            .populate({
                path: "lotes",         // trae los datos del lote y su especie
                populate: { path: "especie" }
            })
            .sort({ fecha: -1 });      // opcional, más recientes primero

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al consultar compras" });
    }
};

const consultarComprasFecha = async (req, res) => {
    try {
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({ mensaje: "Debes enviar la fecha" });
        }

        // Rango del día completo
        const inicio = new Date(fecha);
        inicio.setHours(0, 0, 0, 0);

        const fin = new Date(fecha);
        fin.setHours(23, 59, 59, 999);

        const compras = await compra
            .find({ fecha: { $gte: inicio, $lte: fin } })
            .populate("comprador")
            .populate({
                path: "lotes",
                populate: { path: "especie" }
            })
            .sort({ fecha: -1 });

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al consultar compras por fecha" });
    }
};

const consultarComprasRango = async (req, res) => {
    try {
        const { inicio, fin } = req.query;

        if (!inicio || !fin) {
            return res.status(400).json({ mensaje: "Debes enviar inicio y fin" });
        }

        const i = new Date(inicio);
        const f = new Date(fin);
        f.setHours(23, 59, 59, 999);

        const compras = await compra
            .find({ fecha: { $gte: i, $lte: f } })
            .populate("comprador")
            .populate({
                path: "lotes",
                populate: { path: "especie" }
            })
            .sort({ fecha: -1 });

        res.json(compras);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al consultar compras por rango" });
    }
};

const eliminarCompra = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Encontrar la compra para obtener los lotes asociados
        const compraAEliminar = await compra.findById(id);

        if (!compraAEliminar) {
            return res.status(404).json({ mensaje: "Compra no encontrada" });
        }

        const lotesIds = compraAEliminar.lotes;

        // 2. Eliminar la compra de la base de datos
        await compraAEliminar.deleteOne();

        // 3. Eliminar los lotes asociados
        // Nota: Asumimos que los lotes solo existen dentro del contexto de la compra.
        if (lotesIds && lotesIds.length > 0) {
            await lote.deleteMany({ _id: { $in: lotesIds } });
        }

        res.json({ mensaje: "Compra y lotes asociados eliminados correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar la compra" });
    }
};

export {
    crearCompra,
    consultarCompras,
    consultarComprasFecha,
    consultarComprasRango,
    eliminarCompra
}