import mongoose, { model } from "mongoose"
import bcrypt from "bcryptjs";

const Schema=mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
    },
    apellido_paterno: {
        type: String,
    },
    apellido_materno: {
        type: String,
    },
    telefono: {
        type: String,
    },
    correo: { 
        type: String, 
        unique: true, 
        required: true 
    },
    contraseña: { 
        type: String, 
        required: true 
    },

    rol: {
        type: String,
        enum: ["admin", "vendedor"],
        default: "vendedor"
    }
});

//Encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified("contraseña")) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = function(password) {
    return bcrypt.compare(password, this.contraseña);
};

const usuario=mongoose.model("usuario",usuarioSchema)

export{
    usuario
}