import { comprador } from "../models/comprador.js";


// Crear comprador
const crearComprador = async (req, res) => {
    try {
        const { nombre, apellido_paterno, apellido_materno, direccion, correo } = req.body;

        // Validación mínima
        if (!nombre || !apellido_paterno || !correo) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        // Evitar duplicado por correo
        const compradorExistente = await comprador.findOne({ correo });
        if (compradorExistente) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const nuevoComprador = new comprador({
            nombre,
            apellido_paterno,
            apellido_materno,
            direccion,
            correo,
        });

        await nuevoComprador.save();

        res.status(201).json({
            mensaje: "Comprador creado correctamente",
            comprador: nuevoComprador,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear comprador" });
    }
};

const consultarCompradores = async (req, res) => {
    try {
        const compradores = await comprador.find();
        res.json(compradores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al consultar compradores" });
    }
};

const consultaCompradorId = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el comprador por su ID
        const compradorEncontrado = await comprador.findById(id);

        if (!compradorEncontrado) {
            return res.status(404).json({ mensaje: "Comprador no encontrado" });
        }

        res.json(compradorEncontrado);

    } catch (error) {
        console.error(error);
        // Manejar errores de formato de ID no válido (Mongoose/MongoDB)
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ mensaje: "ID de comprador no válido" });
        }
        res.status(500).json({ mensaje: "Error al consultar comprador por ID" });
    }
};

const editarComprador = async (req, res) => {
    try {
        const { id } = req.params;
        const datosAActualizar = req.body;

        // Opción 1: Usar findByIdAndUpdate (más directo y simple)
        const compradorActualizado = await comprador.findByIdAndUpdate(
            id,
            datosAActualizar,
            { 
                new: true,           // Devuelve el documento después de la actualización
                runValidators: true  // Ejecuta las validaciones del esquema de Mongoose
            }
        );

        if (!compradorActualizado) {
            return res.status(404).json({ mensaje: "Comprador no encontrado" });
        }

        res.json({
            mensaje: "Comprador actualizado correctamente",
            comprador: compradorActualizado
        });

    } catch (error) {
        console.error(error);
        // Puedes agregar lógica para manejar errores específicos de validación (por ejemplo, correo duplicado)
        if (error.code === 11000) { // Código de error de duplicidad de Mongo
            return res.status(400).json({ mensaje: "El valor del campo ya existe" });
        }
        res.status(500).json({ mensaje: "Error al editar comprador" });
    }
};

const eliminarComprador = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el comprador
        const compradorEliminado = await comprador.findByIdAndDelete(id);

        if (!compradorEliminado) {
            return res.status(404).json({ mensaje: "Comprador no encontrado" });
        }

        res.json({ mensaje: "Comprador eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar comprador" });
    }
};

export { crearComprador,
        consultarCompradores,
        consultaCompradorId,
        editarComprador,
        eliminarComprador
 };
