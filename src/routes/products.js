const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para acceder a los archivos JSON
const productsFilePath = path.resolve(__dirname, '../../data/products.json');

// Leer productos desde el archivo
const readProductsFromFile = (callback) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return callback(err);
        }
        const products = JSON.parse(data);
        callback(null, products);
    });
};

// Escribir productos en el archivo
const writeProductsToFile = (products, callback) => {
    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return callback(err);
        }
        callback(null);
    });
};

// Exportar las funciones
module.exports = {
    readProductsFromFile,
    writeProductsToFile,
    router
};

// Rutas para la API
// Para obtener todos los productos
router.get('/', (req, res) => {
    readProductsFromFile((err, products) => {
        if (err) return res.status(500).send('Error reading file');
        res.json(products);
    });
});

// Para obtener el producto por ID
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    readProductsFromFile((err, products) => {
        if (err) return res.status(500).send('Error reading file');
        const product = products.find(p => p.id == pid);
        product ? res.json(product) : res.status(404).send('Product not found');
    });
});

// Para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Valido los campos obligatorios
    if (!title || !description || !code || price == null || stock == null || !category) {
        return res.status(400).send('Todos los campos son obligatorios, a excepción de thumbnails');
    }
    readProductsFromFile((err, products) => {
        if (err) return res.status(500).send('Error reading file');
        // Para generar el ID
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || []
        };
        products.push(newProduct);
        writeProductsToFile(products, (err) => {
            if (err) return res.status(500).send('Error writing file');
            res.status(201).json(newProduct);
        });
    });
});

// Para actualizar un producto
router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    readProductsFromFile((err, products) => {
        if (err) return res.status(500).send('Error reading file');
        const productIndex = products.findIndex(p => p.id == pid);
        if (productIndex === -1) return res.status(404).send('Product not found');
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        writeProductsToFile(products, (err) => {
            if (err) return res.status(500).send('Error writing file');
            res.json(products[productIndex]);
        });
    });
});

// Para eliminar un producto
router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    readProductsFromFile((err, products) => {
        if (err) return res.status(500).send('Error reading file');
        products = products.filter(p => p.id != pid);
        writeProductsToFile(products, (err) => {
            if (err) return res.status(500).send('Error writing file');
            res.status(204).send();
        });
    });
});
