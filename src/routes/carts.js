const express = require('express');
const Cart = require('../models/cartModel');

const router = express.Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: req.body.products || [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Obtener productos de un carrito
router.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).send('Carrito no encontrado');

        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += parseInt(req.body.quantity, 10) || 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: parseInt(req.body.quantity, 10) || 1 });
        }

        await cart.save();
        res.json(cart.products);
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
