// src/config/mongo.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/api_e_commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
    console.log('Conexión a MongoDB establecida');
});

module.exports = mongoose;

