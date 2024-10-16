import ticketRepository from '../repositories/ticket.repository.js';
import CartModel from '../dao/models/cartModel.js';
import ProductModel from '../dao//models/productModel.js';
import UsuarioModel from '../dao/models/userModel.js';

class TicketService {
    async processPurchase(cartId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productosNoDisponibles = [];
        const productosComprados = [];
        let totalAmount = 0;

        for (const item of cart.products) {
            const product = await ProductModel.findById(item.product);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                productosComprados.push(item);
                totalAmount += product.price * item.quantity;
            } else {
                productosNoDisponibles.push(item);
            }
        }

        const usuario = await UsuarioModel.findOne({ cart: cartId });
        const code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const ticketData = {
            code,
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: usuario.email,
        };

        const ticket = await ticketRepository.createTicket(ticketData);
        cart.products = productosNoDisponibles;
        await cart.save();

        return {
            ticket,
            productosNoDisponibles: productosNoDisponibles.map(item => item.product),
        };
    }
}

export default new TicketService();
