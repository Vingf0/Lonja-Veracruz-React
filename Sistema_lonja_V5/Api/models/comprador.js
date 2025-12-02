import mongoose, { model } from "mongoose"
const Schema=mongoose.Schema;

mongoose.pluralize(null)
const compradorSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    apellido_paterno: {
        type: String,
        trim: true,
    },
    apellido_materno: {
        type: String,
        trim: true,
    },
    direccion: {
        type: String,
        trim: true,
    },
    correo: { 
        type: String, 
        unique: true, 
        trim: true,
    }
});

const comprador=mongoose.model("comprador",compradorSchema)

export{
    comprador
}