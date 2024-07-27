const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta correcta al archivo JSON
const productsFilePath = path.resolve(__dirname, '../../data/products.json');

// Obtener todos los productos
router.get('/', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        const products = JSON.parse(data);
        res.json(products);
    });
});

// Obtener producto por ID
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id == pid);
        product ? res.json(product) : res.status(404).send('Product not found');
    });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const newProduct = req.body;
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        const products = JSON.parse(data);
        const newId = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
        newProduct.id = newId;
        products.push(newProduct);
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            res.status(201).json(newProduct);
        });
    });
});

// Actualizar un producto
router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        let products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id == pid);
        if (productIndex === -1) return res.status(404).send('Product not found');
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            res.json(products[productIndex]);
        });
    });
});

// Eliminar un producto
router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        let products = JSON.parse(data);
        products = products.filter(p => p.id != pid);
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            res.status(204).send();
        });
    });
});

module.exports = router;
