import express from "express"
import router from "./routes/rutas.js"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";

// 1. Cargar variables de entorno (si usas un archivo .env local)
dotenv.config()

// 2. Definir el puerto usando la variable de entorno de Render
const PORT = process.env.PORT || 4000; 
const MONGO_URI = process.env.MONGO_URI; 
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// 3. Conexión a la base de datos con manejo de errores
mongoose.Promise=global.Promise

// Usa la variable de entorno MONGO_URI
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conexión a MongoDB Atlas exitosa.');
        
        const app=express()

        // 4. Configuración de CORS con origen dinámico
        app.use(cors({
            origin: FRONTEND_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Accesos middleware
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        
        // Rutas
        app.use("/api",router)

        // 5. Iniciar el servidor SOLO después de conectar la DB
        app.listen(PORT, () => {
            console.log(`🚀 API escuchando en el puerto ${PORT}`);
        });

    })
    .catch(error => {
        console.error('❌ FATAL ERROR: Error al conectar a MongoDB Atlas:', error.message);
        // Detener el despliegue si no hay DB
        process.exit(1); 
    });