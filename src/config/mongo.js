// src/config/mongo.js
import mongoose from 'mongoose';

// Para depurar los errores
mongoose.set('debug', true);

// Función para conectar a la base de datos
const connectToMongo = async () => {
    /*
    try {
        // Conexión a la base de datos en la nube
        await mongoose.connect('mongodb+srv://ninja:671905@commerce.yr759.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('Conexión a MongoDB Atlas establecida');
    } catch (error) {
        console.error('Error de conexión a MongoDB Atlas:', error);
    }
    */
    // Conexión a la base de datos local (opcional)
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_basedatos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a MongoDB local establecida');
    } catch (error) {
        console.error('Error de conexión a MongoDB local:', error);
    }
};

// Exporto la función para que se pueda llamar en app.js
export default connectToMongo;
