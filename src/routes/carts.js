const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Ruta para mostrar la vista de gestión de carritos
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.product');
        if (req.query.format === 'json') {
            // Si el parámetro de consulta 'format' es 'json', retorna los datos en formato JSON
            return res.json({ carts });
        }

        // Si no se solicita formato JSON, renderiza la vista HTML
        res.render('manageCarts', { carts });
    } catch (error) {
        res.status(500).send('Error al cargar los carritos.');
    }
});

// Ruta para crear un nuevo carrito
router.post('/create', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.redirect('/carts');
    } catch (error) {
        res.status(500).send('Error al crear el carrito.');
    }
});

// Ruta para ver un carrito específico
router.get('/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('products.product');
        if (!cart) {
            return res.status(404).send('Carrito no encontrado.');
        }
        res.render('viewCart', { cart });
    } catch (error) {
        res.status(500).send('Error al cargar el carrito.');
    }
});

// Ruta para eliminar un carrito
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Carrito eliminado.' });
    } catch (error) {
        res.status(500).send('Error al eliminar el carrito.');
    }
});

// Ruta para modificar la cantidad de un producto en el carrito
router.put('/:id/products/:productId', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado.');
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = req.body.quantity;
            await cart.save();
        }
        res.json({ message: 'Cantidad modificada.' });
    } catch (error) {
        res.status(500).send('Error al modificar la cantidad.');
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:id/products/:productId', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado.');
        }
        cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);
        await cart.save();
        res.json({ message: 'Producto eliminado del carrito.' });
    } catch (error) {
        res.status(500).send('Error al eliminar el producto del carrito.');
    }
});

// Ruta para vaciar un carrito
router.put('/:id/empty', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado.');
        }
        cart.products = [];
        await cart.save();
        res.json({ message: 'Carrito vaciado.' });
    } catch (error) {
        res.status(500).send('Error al vaciar el carrito.');
    }
});

module.exports = router;
