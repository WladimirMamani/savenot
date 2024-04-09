const express = require('express');
const rutas = express.Router();
const NotaModel = require('../models/Nota');

//LISTAR DATOS
rutas.get('/', async (req, res) =>{
    try {
        const notas = await NotaModel.find();
        console.log(notas);
        res.json(notas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

//AGREGAR DATOS
rutas.post('/agregar', async (req, res) =>{
    console.log(req.body);
    const nuevaNota = new NotaModel({
        referencia: req.body.referencia,
        fuente: req.body.fuente,
        tema: req.body.tema,
        texto: req.body.texto
    });
    try {
        const guardarNota = await nuevaNota.save();
        res.status(201).json(guardarNota);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//ACTUALIZACIÓN DE DATOS
rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarNota = await NotaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarNota);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//ELIMINACIÓN DE REGISTRO
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarNota = await NotaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Registro eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});


//CONSULTAS

//Consulta 1: Buscar por nombre de FUENTE
rutas.get('/consulta1/:fuente', async (req, res) => {
    try{
        const fuente= await NotaModel.find({fuente: req.params.fuente});
        res.json(fuente)
    }
    catch (error)
    {
        res.status(404).json({mensaje: error.message});
    }
});

//Consulta 2: Buscar 
rutas.get('/consulta1/:fuente', async (req, res) => {
    try{
        const fuente= await NotaModel.find({fuente: req.params.fuente});
        res.json(fuente)
    }
    catch (error)
    {
        res.status(404).json({mensaje: error.message});
    }
});







module.exports = rutas;
