//Server
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import cartsRoutes from './routes/carts.js';
import productsRoutes from './routes/products.js';
import Product from './models/productModel.js';
import connectToMongo from './config/mongo.js';
import helpers from 'handlebars-helpers';
const helperFunctions = helpers();
import cookieParser from "cookie-parser";
import passport from 'passport';
import users from "./routes/users.js";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = 8080;

// Conecta a MongoDB
connectToMongo();

//MIDDLEWARE

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
// Carpeta pública para archivos estáticos
app.use(express.static(path.resolve('public'))); // Uso ruta relativa
// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para carritos
app.use('/carts', cartsRoutes);
// Ruta de productos
app.use('/products', productsRoutes);
app.use("/api/sessions", users);


// Configuro Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: helpers,
    extname: '.handlebars',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');

// Carpeta de vistas
app.set('views', path.resolve('src/views'));

// Ruta para ver productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Configuro el servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = new Server(server); // Instancia correcta de Server

// Cargar productos y emitir a los clientes
async function loadProducts() {
    try {
        const products = await Product.find();
        io.emit('updateProducts', products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Manejo de conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    // para enviar los productos actuales al nuevo cliente
    loadProducts();
    // para manejar el agregado de productos
    socket.on('addProduct', async (productData) => {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            loadProducts();
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });

    // para manejar la eliminación de productos
    socket.on('deleteProduct', async (productId) => {
        try {
            await Product.findByIdAndDelete(productId);
            loadProducts();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });
});

// para iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

