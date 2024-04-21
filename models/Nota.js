const mongoose = require('mongoose');

const notaEsquema = new mongoose.Schema({
    numRegistro: Number,
    fechaRegistro: Date,
    referencia : String,
    fuente : String,
    tema : String,
    texto : String,
    etiqueta: String
})

const NotaModel = mongoose.model('Nota',notaEsquema,'nota');
module.exports = NotaModel;