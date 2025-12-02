import mongoose, { model } from "mongoose"
const Schema=mongoose.Schema;

mongoose.pluralize(null)
const compraSchema = new Schema({
    precio_kilo_final: {
        type: Number,
    },
    precio_total: {
        type: Number,
    },
    fecha: { 
        type: Date, 
        default: Date.now
    },
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comprador",
        required: true
    },

    lotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "lote",
        required: true
    }]
});

const compra=mongoose.model("compra",compraSchema)

export{
    compra
}