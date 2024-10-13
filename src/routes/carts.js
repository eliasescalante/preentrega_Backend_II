import express from 'express';
import cartController from '../controllers/cart.controller.js';
import {authenticateUser, isAuthenticated} from '../middleware/auth.js';
const router = express.Router();

// Obtiene el carrito del usuario logueado
router.get('/current', authenticateUser, cartController.getCurrentCart.bind(cartController));
// Ruta para agregar un producto a un carrito específico
router.put('/:cartId/products/:productId/add', cartController.addProductCart.bind(cartController));
// Endpoint para obtener todos los carritos
router.get('/all', cartController.getCart);
// Ruta para crear un carrito
router.post('/create', cartController.createCart);
// Ruta para mostrar la vista de gestión de carritos
router.get('/', authenticateUser,cartController.viewCartManage);
// Ruta para ver un carrito específico
router.get('/:id', cartController.detailCart);
// Ruta para eliminar un carrito
router.delete('/:id', cartController.deleteCart);
// Ruta para eliminar un producto del carrito
router.delete('/:id/products/:productId', cartController.deleteProductFromCart);
// Ruta para vaciar un carrito
router.put('/:id/empty', cartController.emptyCart);
// Ruta para modificar la cantidad de un producto en un carrito específico
router.put('/:cartId/products/:productId/quantity', cartController.updateProductQuantity);

export default router;
