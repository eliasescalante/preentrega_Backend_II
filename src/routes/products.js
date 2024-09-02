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

        // creo un nuevo producto utilizando el modelo de Mongoose
        const newProduct = new Product({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || []
        });
        // guardo el producto en la base de datos
        await newProduct.save(); 
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = query ? { category: query } : {}; // Ajusta según tu esquema y necesidades de filtro
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const products = await Product.find(filter)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort(sortOption);

        const totalProducts = await Product.countDocuments(filter);

        res.render('products', {
            products: products,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            hasNextPage: Number(page) < Math.ceil(totalProducts / limit),
            hasPreviousPage: Number(page) > 1,
            nextPage: Number(page) + 1,
            previousPage: Number(page) - 1,
            limit: Number(limit),
            sort,
            query,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Ruta para obtener los detalles de un producto
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('productDetails', { product });
    } catch (error) {
        res.status(500).send('Server error');
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