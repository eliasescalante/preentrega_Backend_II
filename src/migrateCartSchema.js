import mongoose from 'mongoose';
import Cart from './dao/models/cartModel.js'; // Asegúrate de que la ruta sea correcta
import configObject from './config/config.js';
const {mongo_url} = configObject;

// Conexión a la base de datos
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a la base de datos');
    return migrateCarts();
})
.catch(err => console.error('Error de conexión:', err));

async function migrateCarts() {
    try {
        const carts = await Cart.find(); // Obtén todos los carritos

        for (const cart of carts) {
            // Aquí puedes aplicar las transformaciones necesarias a cada carrito
            // Por ejemplo, asegurarte de que el campo userId esté presente
            if (!cart.userId) {
                // Si no hay userId, puedes decidir qué hacer: establecer un valor predeterminado, eliminar el carrito, etc.
                console.log(`El carrito con ID ${cart._id} no tiene userId. Se eliminará.`);
                await Cart.deleteOne({ _id: cart._id }); // Ejemplo de eliminación
            } else {
                // Si necesitas actualizar un campo, puedes hacer algo como esto:
                // cart.someField = 'nuevo valor';
                // await cart.save(); // Guarda el carrito actualizado
            }
        }

        console.log('Migración completada');
    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        mongoose.connection.close(); // Cierra la conexión a la base de datos
    }
}

// Ejecutar la función de migración
migrateCarts();
