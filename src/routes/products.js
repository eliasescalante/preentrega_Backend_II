import express from 'express';
import productController from '../controllers/product.controller.js';
import {authenticateUser} from '../middleware/auth.js';

const router = express.Router();

// Rutas
router.post('/', productController.addProduct);
router.get('/', authenticateUser, productController.getProduct);
router.get('/:id', authenticateUser, productController.getDetailProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
