import express from 'express';
import productController from '../controllers/product.controller.js';
import {authenticateUser} from '../middleware/auth.js';

const router = express.Router();

// Rutas
router.post('/', productController.addProduct.bind(productController));
router.get('/', authenticateUser, productController.getProduct.bind(productController));
router.get('/:id', authenticateUser, productController.getDetailProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));

export default router;
