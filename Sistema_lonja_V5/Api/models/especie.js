import mongoose, { model } from "mongoose"
const Schema=mongoose.Schema;

mongoose.pluralize(null)
const especieSchema = new Schema({
    nombre: { 
        type: String, 
        required: true, 
        trim: true },
    imagen: {
        type: String,
    },
    tipo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "tipo", 
        required: true 
    },
    estado: {
        type: Boolean,
        enum: ["true", "false"],
        default: "true"
    }
});

const especie=mongoose.model("especie",especieSchema)

export{
    especie
}