const express = require('express');
const path = require('path');
const { readJsonFile, writeJsonFile, generateNewId } = require('../utils/jsonFileHandler');

const router = express.Router();
const cartsFilePath = path.join(__dirname, '../../data/carts.json');

// Para crear un nuevo carrito
router.post('/', (req, res) => {
    try {
        const carts = readJsonFile(cartsFilePath);
        const newCart = { id: generateNewId(carts), products: req.body.products || [] };
        carts.push(newCart);
        writeJsonFile(cartsFilePath, carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Para obtener productos de un carrito
router.get('/:cid', (req, res) => {
    try {
        const carts = readJsonFile(cartsFilePath);
        const cart = carts.find(c => c.id === parseInt(req.params.cid, 10));
        cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    try {
        const carts = readJsonFile(cartsFilePath);
        const cart = carts.find(c => c.id === parseInt(req.params.cid, 10));
        if (!cart) return res.status(404).send('Carrito no encontrado');

        const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += parseInt(req.body.quantity, 10) || 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: parseInt(req.body.quantity, 10) || 1 });
        }

        writeJsonFile(cartsFilePath, carts);
        res.json(cart.products);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
