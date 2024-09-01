// Conexion con la base de datos
const mongoose = require('mongoose');

mongoose.set('debug', true); // Esto mostrará consultas y comandos en la consola


mongoose.connect('mongodb+srv://ninja:671905@commerce.yr759.mongodb.net/', {
    serverSelectionTimeoutMS: 5000
});
/*
mongoose.connect('mongodb://localhost:27017/mi_basedatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
*/

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
    console.log('Conexión a MongoDB establecida');
});

module.exports = mongoose;

