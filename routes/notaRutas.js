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
        // numRegistro: req.body.numRegistro,
        // fechaRegistro: req.body.fechaRegistro,
        // referencia: req.body.referencia,
        // fuente: req.body.fuente,
        // tema: req.body.tema,
        // texto: req.body.texto,
        // etiqueta: req.body.etiqueta

        //PROYECTO DE REGISTRO DE PRODUCTOS
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        precioCompra: req.body.precioCompra,
        precioVenta: req.body.precioVenta,
        stock: req.body.stock,
        medida: req.body.medida,
        categoria: req.body.categoria,
        foto: req.body.foto,
        activo: req.body.activo,
        fechaRegistrado: req.body.fechaRegistrado
        
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

//Consulta 2: Buscar por coincidencia de texto
rutas.get('/consulta2/:texto', async (req, res) => {
    try {
        const coincidencia = await NotaModel.find( { $text: { $search: req.params.texto } } )
        res.json(coincidencia);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//Consulta 3: Búsqueda por id
rutas.get('/consulta3/:id', async (req, res) => {
    try {
        const citaId = await NotaModel.findOne({_id: req.params.id});
        res.json(citaId);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//Consulta 4: Ordenar por registros descendentemente
rutas.get('/consulta4', async (req, res) => {
    try {
        const registroDescendente = await NotaModel.find().sort({numRegistro: -1});
        res.json(registroDescendente);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//Consulta 5: Ordenar por nombre de Tema
rutas.get('/consulta5', async (req, res) => {
    try {
        const nombreOrdenar = await NotaModel.find().sort({tema: 1});
        res.json(nombreOrdenar);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//Consulta 6: Listar por etiqueta
rutas.get('/consulta6/:etiqueta', async (req, res) => {
    try{
        const etiqueta= await NotaModel.find({etiqueta: req.params.etiqueta});
        res.json(etiqueta)
    }
    catch (error)
    {
        res.status(404).json({mensaje: error.message});
    }
});

//Consulta 7: Listar los registros con numero de registro inferior a
rutas.get('/consulta7/:numero', async (req, res) => {
    try {
        const inferior = await NotaModel.find({numRegistro: {$lte: req.params.numRegistro }})
        res.json(inferior);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});

//Consulta 8: listar por fecha de registro Descendente
rutas.get('/consulta8', async (req, res) => {
    try {
        const listaFecha = await NotaModel.find().sort({fechaRegistro: -1});
        res.json(listaFecha);
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
});


//Consulta 9: buscar por fecha de registro
// rutas.get('/consulta9/:fecha', async (req, res) => {
//     try{
//         const busquedaFecha= await NotaModel.find({fechaRegistro: req.params.fechaRegistro});
//         res.json(busquedaFecha)
//     }
//     catch (error)
//     {
//         res.status(404).json({mensaje: error.message});
//     }
// });

//Consulta 9: Buscar por fecha de registro
rutas.get('/consulta9/:fecha', async (req, res) => {
    try {
        const fechaReg = await NotaModel.find({fechaRegistro: req.params.fechaRegistro });
        res.json(fechaReg);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
  });

  //Consulta 10: Contar registros
//   db.ciudades.find().count();
//   db.coleccion.find({filtros}).count();

// db.table_name.count()


rutas.get('/consulta10/', async (req, res) => {
    try{
        const [totalRegistros] = [
            db.dbNotas.estimatedDocumentCount(),
            // dbNotas.nota.count()
          ];
          console.log(`total registros: ${totalRegistros}`);
    }
    catch (error)
    {
        res.status(404).json({mensaje: error.message});
    }
});






module.exports = rutas;
