import express from 'express';
import cartController from '../controllers/cart.controller.js';
import {authenticateUser, isAuthenticated} from '../middleware/auth.js';
//import UsuarioModel from "../dao/models/userModel.js";
//import TicketModel from '../dao/models/ticket.model.js';
//import CartModel from '../dao/models/cartModel.js';
//import ProductModel from "../dao/models/productModel.js";
const router = express.Router();

// Obtiene el carrito del usuario logueado
router.get('/current', authenticateUser, cartController.getCurrentCart);
// Ruta para agregar un producto a un carrito específico
router.put('/:cartId/products/:productId/add', cartController.addProductCart);
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
//finalizar compra
router.post("/:cid/purchase", authenticateUser, cartController.purchaseCart);

/*
//finalizar la compra - idea general para el ticket -
router.post("/:cid/purchase", authenticateUser, async (req, res) => {
    //purchase sin patron...
    const cartId = req.params.cid;
    console.log(`Buscando carrito con ID: ${cartId}`);

    try {
        const carrito = await CartModel.findById(cartId);
        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const arrayProductos = carrito.products;
        const productosNoDisponibles = [];
        const productosComprados = [];
        let totalAmount = 0;

        for (const item of arrayProductos) {
            const productId = item.product;
            const product = await ProductModel.findById(productId);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                productosComprados.push(item);
                // Calcula el total del monto
                totalAmount += product.price * item.quantity;
            } else {
                productosNoDisponibles.push(item);
            }
        }

        const usuarioDelCarrito = await UsuarioModel.findOne({ cart: cartId }); 
        const code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`; 
        const ticket = new TicketModel({
            code: code,
            purchase_datetime: new Date(),
            amount: totalAmount, 
            purchaser: usuarioDelCarrito.email,
        });

        await ticket.save();

        carrito.products = productosNoDisponibles; 
        await carrito.save();

        res.json({
            message: "Compra generada",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser,
            },
            productosNoDisponibles: productosNoDisponibles.map((item) => item.product),
        });
    } catch (error) {
        console.error("Error al crear el ticket:", error); 
        res.status(500).send("Error del servidor al crear ticket");
    }
});
*/
export default router;
