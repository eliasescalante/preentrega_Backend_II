import cartService from '../services/cart.service.js';
import CartModel from '../dao/models/cartModel.js';
import ProductModel from '../dao/models/productModel.js';
import TicketService from '../services/ticket.service.js';
import UsuarioModel from '../dao/models/userModel.js';
import UserRepository from '../repositories/user.repository.js';
import cartRepository from '../repositories/cart.repository.js';

class CartController {

    async getCurrentCart(req, res) {
        // metodo para obtener el carrito actual
        try {
            const userId = req.user.id;
            const cartId = req.user.cart;
            if (!cartId) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            const cart = await cartService.getCartDetails(cartId);

            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            res.json(cart);
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            res.status(500).json({ message: 'Error al cargar el carrito' });
        }
    }

    async getCart(req, res) {
        // metodo para obtener el carrito del usuario
        try {
            const carts = await cartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos' });
        }
    }

    async createCart(req, res) {
        // metodo para crear un nuevo carrito para el usuario
        try {
            const userId = req.body.userId;
            const newCart = await cartService.createNewCart(userId);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear carrito' });
        }
    }

    async viewCartManage(req, res) {
        // metodo para obtener el carrito del usuario y mostrarlo
        try {
            const cartId = req.user.cart; 
            const cart = await cartService.getCartById(cartId);
            
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
            res.render('manageCarts', { cart });
        } catch (error) {
            console.error('Error al cargar el carrito del usuario:', error);
            res.status(500).send('Error al cargar el carrito del usuario');
        }
    }

    async detailCart(req, res) {
        // metodo para obtener el detalle del carrito
        try {
            const cart = await cartService.getCartDetails(req.params.id);
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            res.render('viewCart', { cart });
        } catch (error) {
            res.status(500).json({ message: 'Error al cargar el carrito' });
        }
    }

    async deleteCart(req, res) {
        // metodo para eliminar el carrito del usuario
        try {
            await cartService.deleteCartById(req.params.id);
            res.json({ message: 'Carrito eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el carrito' });
        }
    }

    async addProductCart(req, res) {
        // metodo para agregar producto al carrito
        try {
            const { cartId, productId } = req.params; // Asegúrate de que estos son los nombres correctos
            const { quantity } = req.body;
            if (!cartId || !productId || quantity === undefined) {
                return res.status(400).json({ message: "Faltan parámetros necesarios" });
            }
            const updatedCart = await cartService.addOrUpdateProductInCart(cartId, productId, quantity);
            res.json({ success: true, message: "Producto agregado correctamente", cart: updatedCart });
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error.message);
            res.status(500).json({ message: 'Error al agregar el producto al carrito.' });
        }
    }

    async updateProductQuantity(req, res) {
        // metodo para actualizar la cantidad de un producto en el carrito
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        try {
            const updatedCart = await cartService.modifyProductQuantity(cartId, productId, quantity);
            if (updatedCart){
                return res.json({ success: true, message: 'Cantidad actualizada correctamente.' });
            } else {
                return res.status(400).json({ success: false, message: 'No se pudo actualizar la cantidad.' });
            }
            
        } catch (error) {
            console.error("Error al modificar la cantidad del producto en el carrito:", error.message);
            res.status(500).json({ message: "Error al modificar la cantidad del producto en el carrito" });
        }
    }

    async deleteProductFromCart(req, res) {
        // metodo para borrar un producto del carrito
        const { id, productId } = req.params;

        try {
            const updatedCart = await cartService.deleteProductInCart(id, productId);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error.message);
            res.status(500).json({ message: "Error al eliminar el producto del carrito" });
        }
    }

    async emptyCart(req, res) {
        //metodo para vaciar un carrito
        const { id } = req.params;

        try {
            const updatedCart = await cartService.emptyCart(id);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error.message);
            res.status(500).json({ message: "Error al vaciar el carrito" });
        }
    }

    async purchaseCart(req, res) {
        // metodo para realizar una compra del carrito
        // tiene un bug - por ahora no consigo que funcione
        try {
            const cartId = req.params.cid;
            const userId = req.user._id; 
    
            // Obtener el carrito usando el cartId
            const cart = await cartRepository.getCartById(cartId);
    
            if (!cart) {
                return res.status(404).send({ message: "Carrito no encontrado" });
            }
            
            const amount = cart.products.reduce((total, item) => {
                const price = item.product.price; 
                const quantity = item.quantity; 
                return total + (price * quantity); 
            }, 0);

            // Obtiene el usuario del carrito
            const usuarioDelCarrito = await UserRepository.getUserById(userId);
    
            if (!usuarioDelCarrito) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
    
            // Llama al servicio para generar el ticket
            const ticket = await TicketService.generateTicket(usuarioDelCarrito, amount);
    
            if (!ticket) {
                return res.status(500).send({ message: "Error al crear el ticket." });
            }
    
            res.status(201).send({ message: "Ticket creado con éxito", ticket });
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            res.status(500).send({ message: "Error al procesar la compra" });
        }
    }
}

export default new CartController();
