import express from 'express';
import cartController from '../controllers/cart.controller.js';
import {authenticateUser} from '../middleware/auth.js';
const router = express.Router();

router.get('/current', authenticateUser, (req, res, next) => {
    console.log('Ruta /current alcanzada'); // Log para verificar el acceso a la ruta
    next();
}, cartController.getCurrentCart.bind(cartController));
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
// Ruta para agregar un producto a un carrito específico
// Ruta para modificar la cantidad de un producto en un carrito específico
router.put('/:cartId/products/:productId/quantity', cartController.updateProductQuantity);
// Obtiene el carrito del usuario logueado


export default router;
