import express from 'express';
import productController from '../controllers/product.controller.js';

const router = express.Router();

// Rutas
router.post('/', productController.addProduct.bind(productController));
router.get('/', productController.getProduct.bind(productController));
router.get('/:id', productController.getDetailProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));

export default router;
