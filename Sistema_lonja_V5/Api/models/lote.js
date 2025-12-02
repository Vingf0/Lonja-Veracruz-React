import mongoose, { model } from "mongoose"
const Schema=mongoose.Schema;

mongoose.pluralize(null)
const loteSchema = new Schema({
    kilos: {
        type: Number,
        required: true
    },
    numero_cajas: {
        type: Number,
        required: true
    },
    precio_kilo_salida: {
        type: Number,
        required: true
    },
    fecha: { 
        type: Date, 
        default: Date.now,
        required: true
    },
    especie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "especie",
        required: true
    },
    no_lote:{
        type: String,
        required: true
    }
});

const lote=mongoose.model("lote",loteSchema)

export{
    lote
}