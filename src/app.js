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
import {authenticateUser, authenticateAdmin} from './middleware/auth.js';

const {mongo_url, puerto } = configObject;
const app = express();

// conexion
mongoose.connect(mongo_url)
    .then(() => console.log("Conexion exitosa!"))
    .catch((error) => console.log("error en la conexion", error))

//MIDDLEWARE
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// middleware de sesiones
app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Carpeta pública
app.use(express.static(path.resolve('public')));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/carts', cartsRoutes);
app.use('/products', productsRoutes);
app.use("/api/sessions", users);
app.get('/realtimeproducts', authenticateAdmin, (req, res) => {
    res.render('realTimeProducts');
});

//Handlebars
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

// servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = new Server(server);

async function loadProducts() {
    try {
        const products = await Product.find();
        io.emit('updateProducts', products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    loadProducts();
    socket.on('addProduct', async (productData) => {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            loadProducts();
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });
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

