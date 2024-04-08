const mongoose = require('mongoose');

const notaEsquema = new mongoose.Schema({
    referencia : String,
    fuente : String,
    tema : String,
    texto : String
})

const NotaModel = mongoose.model('Nota',notaEsquema,'nota');
module.exports = NotaModel;