import express from "express"
import mongoose from "mongoose"
import moviesRoutes from "./routes/moviesRoutes.js"
import { verificarCuerpoVacio } from "./middleware/middleware.js";

//Usando ES modules, la variable __filename no está disponible de manera predeterminada. Por eso usamos el módulo url  y la función import.meta.url para obtener el equivalente.
import { fileURLToPath } from "url";
import path from "path"

import dotenv from "dotenv"
dotenv.config();

//Accedo a las variables de entorno
const dbURL = process.env.MONGODB_URI;

//Armo la conexión a la base de datos en Mongo DB usando la URI cargada en el archivo .env
mongoose.connect(process.env.MONGODB_URI)
    .then (() => console.log('Conexión a la Base de Datos exitosa'))
    .catch ((err) => console.log('Error al conectar: a la Base de Datos: ', err));

//Configuramos el puerto
const app = express();
const port = 3000;

// Convertimos import.meta.url a __filename
const __filename = fileURLToPath(import.meta.url);

//Permitimos el manejo de datos en formato JSON. Es necesario si vamos a trabajar con MongoDB?
app.use(express.json());
app.use(verificarCuerpoVacio);

//Mostramos desde public todo lo disponible en ese directorio.
app.use(express.static(path.join(path.dirname(__filename), 'public')))

//Middlewares


//Rutas al index
app.get("/", (req, res) => {
        // res.sendFile(path.join(path.dirname(__filename), 'public', 'index.html'));
});

//Usamos las rutas que están cargadas en los otros archivos
app.use('/api', moviesRoutes);

app.listen(port, () => console.log(`http://localhost:${port}`));