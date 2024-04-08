const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//importar rutas
const notasRutas = require('./routes/notaRutas');

//configuraciones
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;

//configurar express para JSON
app.use(express.json());

//conexion con la BASE DE DATOS
mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion con MONGODB exitosa');
                app.listen(PORT, () => { console.log(`Servidor funcionando en puerto ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));


//GESTIÓN DE RUTAS
app.use('/ruta-nota',notasRutas)

