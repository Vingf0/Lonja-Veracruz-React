import express from "express"
import router from "./routes/rutas.js"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";

//cargar variables de entorno
dotenv.config()

mongoose.Promise=global.Promise
//mongoose.connect('mongodb://localhost/lonja')
mongoose.connect('mongodb+srv://floresortunoirving_db_user:1234@lonjacluster.xaw9cvc.mongodb.net/lonja?appName=LonjaCluster')

const app=express()

//accesos json
app.use(express.json())

//accesos a los datos del formulario
app.use(express.urlencoded({extended:true}))

//Corse para recibir ...
app.use(cors({
  origin: 'http://localhost:3000'  // solo tu React
}));

app.use("/api",router)

app.listen(4000)