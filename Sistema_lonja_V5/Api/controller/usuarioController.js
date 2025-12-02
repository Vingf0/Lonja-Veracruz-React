import { usuario } from "../models/usuario.js";
import bcrypt from "bcryptjs"

const crearUsuario = async (req, res) => {
    try {
        const { correo } = req.body;

        // Verificar si ya existe
        const existe = await usuario.findOne({ correo });
        if (existe) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const usuarios = new usuario(req.body);
        await usuarios.save();

        res.json({
            mensaje: "Usuario creado correctamente",
            usuario: {
                id: usuarios._id,
                nombre: usuarios.nombre,
                correo: usuarios.correo,
                rol: usuarios.rol
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al crear usuario" });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { correo, contraseña, ...resto } = req.body;

        const usuarios = await usuario.findById(id);
        if (!usuarios) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Validar correo duplicado
        if (correo && correo !== usuarios.correo) {
            const existeCorreo = await usuario.findOne({ correo });
            if (existeCorreo) {
                return res.status(400).json({ mensaje: "Ese correo ya existe" });
            }
            usuarios.correo = correo;
        }

        // Si viene nueva contraseña, encriptarla
        if (contraseña) {
            const salt = await bcrypt.genSalt(10);
            usuarios.contraseña = await bcrypt.hash(contraseña, salt);
        }

        // Actualizar datos restantes
        Object.assign(usuarios, resto);

        await usuarios.save();

        res.json({
            mensaje: "Usuario actualizado",
            usuario: {
                id: usuarios._id,
                nombre: usuarios.nombre,
                correo: usuarios.correo,
                rol: usuarios.rol
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al editar usuario" });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarios = await usuario.findById(id);
        if (!usuarios) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        await usuarios.deleteOne();

        res.json({ mensaje: "Usuario eliminado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
};

const consultaUsuarios=async(req,res,next)=>{
          
    try{
        const usuarios=await usuario.find({})
        res.json(usuarios)
    }catch(error){
        console.log(error)
        next()
    }
    
}

const consultaUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarios = await usuario.findById(id).select('-contraseña'); // Excluir la contraseña por seguridad

        if (!usuarios) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarios);

    } catch (error) {
        console.log(error);
        // Manejar errores de ID mal formado (por ejemplo, si no tiene el formato de ObjectId de Mongo)
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ mensaje: "ID de usuario no válido" });
        }
        res.status(500).json({ mensaje: "Error al consultar usuario por ID" });
    }
};

export{
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    consultaUsuarios,
    consultaUsuarioId
}