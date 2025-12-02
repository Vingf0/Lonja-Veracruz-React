import { usuario } from "../models/usuario.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    const usuarios = await usuario.findOne({ correo });
    if (!usuarios) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(contraseña, usuarios.contraseña);

    if (!validPassword) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Aquí el error: process.env.JWT_SECRET está vacío
    const token = jwt.sign(
        { id: usuarios._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    console.log("Login Extitoso")
    res.json({
        mensaje: "Login exitoso",
        nombre: usuarios.nombre,
        rol: usuarios.rol,
        token
    });
};

export{
    login
};