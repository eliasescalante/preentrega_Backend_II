import express from 'express';
import cartController from '../controllers/cart.controller.js';
import authenticateUser from '../middleware/auth.js';


const router = express.Router();

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
// Ruta para agregar un producto a un carrito específico
router.put('/:cid/products/:pid/add', cartController.addProductCart);
// Ruta para modificar la cantidad de un producto en un carrito específico
router.put('/:cartId/products/:productId/quantity', cartController.updateProductQuantity);
// Obtiene el carrito del usuario logueado
router.get('/current', authenticateUser, cartController.getCurrentCart.bind(cartController));

export default router;
