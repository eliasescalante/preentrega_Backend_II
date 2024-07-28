const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware
app.use(express.json());

// Rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// para acceder a los archivos estaticos
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
