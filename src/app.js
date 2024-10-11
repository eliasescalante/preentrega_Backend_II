//Server
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import cartsRoutes from './routes/carts.js';
import productsRoutes from './routes/products.js';
import Product from './dao/models/productModel.js';
import helpers from 'handlebars-helpers';
const helperFunctions = helpers();
import cookieParser from "cookie-parser";
import passport from 'passport';
import users from "./routes/users.js";
import initializePassport from "./config/passport.config.js";
import configObject from './config/config.js';
import mongoose from 'mongoose';
import session from 'express-session';
import sessionRoutes from './routes/sessions.js';


const {mongo_url, puerto } = configObject;
const app = express();

// conexion a la base de datos
mongoose.connect(mongo_url)
    .then(() => console.log("Conexion exitosa!"))
    .catch((error) => console.log("error en la conexion", error))

//MIDDLEWARE
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Configura el middleware de sesiones
app.use(session({
    secret: 'tu_secreto', // Cambia esto a un secreto más seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si estás usando HTTPS
}));


// Carpeta pública para archivos estáticos
app.use(express.static(path.resolve('public'))); // Uso ruta relativa

// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/api/sessions', sessionRoutes);
app.use('/carts', cartsRoutes);
app.use('/products', productsRoutes);
app.use("/api/sessions", users);

// Ruta para ver productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

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
server.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});

