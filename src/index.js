const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = 8080;

// Configuración del motor de plantillas
app.engine('handlebars', engine({
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// Configuración del directorio de vistas
app.set('views', path.join(__dirname, 'views'));

// Configuración de la carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear servidor HTTP y configurar Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Leer productos desde el archivo JSON
const getProducts = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    return JSON.parse(data);
};

// Ruta para ver todos los productos
app.get('/products', (req, res) => {
    const products = getProducts();
    res.render('products', { products });
});

// Ruta para ver productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Configuración de Socket.IO para actualizaciones en tiempo real
io.on('connection', (socket) => {
    console.log('A user connected');

    // Enviar los productos al cliente cuando se conecta
    socket.emit('updateProducts', getProducts());

    // Escuchar eventos de agregar producto
    socket.on('addProduct', (product) => {
        // Agregar el nuevo producto
        addProduct(product, (err, newProduct) => {
            if (err) {
                console.error('Error al agregar producto:', err);
                return;
            }
            // Emitir la lista completa de productos a todos los clientes conectados
            io.emit('updateProducts', getProducts());
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Función para agregar un producto
const addProduct = (product, callback) => {
    // Leer productos, agregar el nuevo y escribir en el archivo
    require('./routes/products').readProductsFromFile((err, products) => {
        if (err) return callback(err);
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            ...product,
            status: true,  // Asegurar que el status esté en true
            price: parseFloat(product.price),  // Convertir a número
            stock: parseInt(product.stock)    // Convertir a número entero
        };
        products.push(newProduct);
        require('./routes/products').writeProductsToFile(products, (err) => {
            if (err) return callback(err);
            callback(null, newProduct);
        });
    });
};

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
