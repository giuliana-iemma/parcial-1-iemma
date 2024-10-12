import express from "express"
import mongoose from "mongoose"

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

//Rutas

app.listen(port, () => console.log(`http://localhost:${port}`));