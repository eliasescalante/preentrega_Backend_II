import cartService from '../services/cart.service.js';

class CartController {
    async getCart(req, res) {
        try {
            const carts = await cartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos' });
        }
    }

    async createCart(req, res) {
        try {
            const newCart = await cartService.createNewCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear carrito' });
        }
    }

    async viewCartManage(req, res) {
        try {
            const carts = await cartService.getAllCarts();
            res.render('manageCarts', { carts });
        } catch (error) {
            res.status(500).json({ message: 'Error al cargar los carritos' });
        }
    }

    async detailCart(req, res) {
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
        try {
            await cartService.deleteCartById(req.params.id);
            res.json({ message: 'Carrito eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el carrito' });
        }
    }

    async addProductCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartService.addOrUpdateProductInCart(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar/modificar el producto en el carrito' });
        }
    }

    async updateProductQuantity(req, res) {
        const { cartId, productId } = req.params;
        const { quantity } = req.body; // Asegúrate de que estás recibiendo la cantidad correctamente

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
