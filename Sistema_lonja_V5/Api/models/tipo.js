import mongoose, { model } from "mongoose"
const Schema=mongoose.Schema;

mongoose.pluralize(null)
const tipoSchema=new Schema({
    nombre:{
        type:String,
        unique:true,
        required: true,
        trim: true
    }
});

const tipo=mongoose.model("tipo",tipoSchema)

export{
    tipo
}