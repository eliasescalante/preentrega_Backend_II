const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta  para acceder al archivo de carritos
const cartsFilePath = path.join(__dirname, '../../data/carts.json');

// Función para leer el archivo de carritos
function readCartsFile() {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de carritos:', error.message);
        throw error;
    }
}

// Función para escribir en el archivo de carritos
function writeCartsFile(carts) {
    try {
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error('Error al escribir en el archivo de carritos:', error.message);
        throw error;
    }
}

// Creo un nuevo carrito
router.post('/', (req, res) => {
    try {
        const newCart = req.body;
        const carts = readCartsFile();
        const newId = carts.length ? Math.max(carts.map(c => c.id)) + 1 : 1;
        newCart.id = newId;
        newCart.products = newCart.products || [];
        carts.push(newCart);
        writeCartsFile(carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Obtengo productos de un carrito
router.get('/:cid', (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);
        const carts = readCartsFile();
        const cart = carts.find(c => c.id === cid);
        cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Agrego un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);
        const pid = req.params.pid;
        const quantity = parseInt(req.body.quantity, 10) || 1;
        const carts = readCartsFile();
        const cart = carts.find(c => c.id === cid);
        
        if (!cart) return res.status(404).send('Carrito no encontrado');
        
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }
        
        writeCartsFile(carts);
        res.json(cart.products);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
