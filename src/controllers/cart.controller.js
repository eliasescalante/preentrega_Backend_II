import cartService from '../services/cart.service.js';

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
        // metodo obtener el carrito del usuario y mostrarlo
        try {
            const userId = req.user._id;
            const cart = await cartService.getCartByUserId(userId);
            
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
            res.render('manageCarts', { cart });
        } catch (error) {
            console.error('Error al cargar el carrito del usuario:', error);
            res.status(500).send('Error al cargar el carrito del usuario');
        }
    };

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
}

export default new CartController();
