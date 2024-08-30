const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || price == null || stock == null || !category) {
            return res.status(400).send('Todos los campos son obligatorios, a excepción de thumbnails');
        }

        // Crear un nuevo producto utilizando el modelo de Mongoose
        const newProduct = new Product({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || []
        });

        await newProduct.save(); // Guardar el producto en la base de datos
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Verifico si el ID es una cadena no vacía y un ObjectId válido
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;