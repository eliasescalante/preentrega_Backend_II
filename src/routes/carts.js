const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');

// Endpoint para obtener todos los carritos
router.get('/all', async (req, res) => {
    try {
        const carts = await Cart.find().select('_id');
        res.json(carts);
    } catch (error) {
        console.error('Error al obtener carritos:', error);
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
});

// Ruta para crear un carrito
router.post('/create', async (req, res) => {
    try {
        const newCart = new Cart();
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).send('Error al crear carrito');
    }
});

// Ruta para mostrar la vista de gestión de carritos.
router.get('/', async (req, res) => {
    try {
        console.log('Intentando obtener los carritos...');
        const carts = await Cart.find().populate('products.product');
        if (req.query.format === 'json') {
            console.log('Carritos obtenidos:', carts);
            return res.json({ carts });
        } else {
            res.render('manageCarts', { carts });
        }
    } catch (error) {
        console.error('Error al obtener los carritos:', error);
        res.status(500).send('Error al cargar los carritos.');
    }
});


// Ruta para ver un carrito específico
router.get('/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('products.product'); // Asegúrate de que los productos se pueblen correctamente
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

// Ruta para agregar un producto a un carrito específico
router.put('/:cid/products/:pid/add', async (req, res) => {
    console.log('Endpoint /:cid/products/:pid/add alcanzado');
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Cantidad no válida' });
        }

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ message: 'ID de producto no válido' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex > -1) {
            // Si el producto está en el carrito, incrementar la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        res.json({ success: true, message: 'Producto agregado/modificado en el carrito', cart });
    } catch (error) {
        console.error('Error al agregar/modificar el producto en el carrito:', error);
        res.status(500).json({ message: 'Error al agregar/modificar el producto' });
    }
});

// Ruta para modificar la cantidad de un producto en un carrito específico
router.put('/:cid/products/:pid/quantity', async (req, res) => {
    console.log('Endpoint /:cid/products/:pid/quantity alcanzado');
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Cantidad no válida' });
        }

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ message: 'ID de producto no válido' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Buscar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex > -1) {
            // Si el producto está en el carrito, actualizar la cantidad
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.json({ success: true, message: 'Cantidad actualizada', cart });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        console.error('Error al modificar la cantidad del producto en el carrito:', error);
        res.status(500).json({ message: 'Error al modificar la cantidad' });
    }
});

module.exports = router;