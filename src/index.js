const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const cartsRoutes = require('./routes/carts');
const productsRoutes = require('./routes/products');
const { readJsonFile, writeJsonFile, generateNewId } = require('./utils/jsonFileHandler');

const app = express();
const PORT = 8080;

// Configuro  Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/carts', cartsRoutes);
app.use('/api/products', productsRoutes);

// Ruta para ver todos los productos
app.get('/products', (req, res) => {
    const products = readJsonFile(path.join(__dirname, '../data/products.json'));
    res.render('products', { products });
});

// Ruta para ver productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Configuro el servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Configuro el Socket.IO para actualización en tiempo real
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('updateProducts', readJsonFile(path.join(__dirname, '../data/products.json')));

    socket.on('addProduct', (product) => {
        try {
            const products = readJsonFile(path.join(__dirname, '../data/products.json'));
            const newProduct = { ...product, id: generateNewId(products), status: true  };
            products.push(newProduct);
            writeJsonFile(path.join(__dirname, '../data/products.json'), products);
            io.emit('updateProducts', products);
        } catch (err) {
            console.error('Error al agregar producto:', err);
        }
    });

    socket.on('deleteProduct', (productId) => {
        try {
            let products = readJsonFile(path.join(__dirname, '../data/products.json'));
            products = products.filter(p => p.id !== parseInt(productId, 10));
            writeJsonFile(path.join(__dirname, '../data/products.json'), products);
            io.emit('updateProducts', products);
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Arranco el servidor
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
