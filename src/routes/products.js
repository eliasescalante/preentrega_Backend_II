const express = require('express');
const path = require('path');
const { readJsonFile, writeJsonFile, generateNewId } = require('../utils/jsonFileHandler');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../../data/products.json');

// Para obtener todos los productos
router.get('/', (req, res) => {
    try {
        const products = readJsonFile(productsFilePath);
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Para agregar un nuevo producto
router.post('/', (req, res) => {
    try {
        const products = readJsonFile(productsFilePath);
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || price == null || stock == null || !category) {
            return res.status(400).send('Todos los campos son obligatorios, a excepción de thumbnails');
        }

        const newProduct = {
            id: generateNewId(products),
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
        writeJsonFile(productsFilePath, products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Para eliminar un producto
router.delete('/:pid', (req, res) => {
    try {
        let products = readJsonFile(productsFilePath);
        products = products.filter(p => p.id !== parseInt(req.params.pid, 10));
        writeJsonFile(productsFilePath, products);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
