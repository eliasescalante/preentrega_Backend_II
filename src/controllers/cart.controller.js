import cartService from '../services/cart.service.js';

class CartController {

    // src/controllers/cart.controller.js
    async getCurrentCart(req, res) {
        try {
            const userId = req.user.id; // Asegúrate de que estés accediendo al ID correctamente
            console.log("estoy en current adentro del try", userId);
            const cartId = req.user.cart; // Obtén el ID del carrito desde el usuario autenticado
            console.log("estoy en current adentro del try", cartId);
            // Verifica que el cartId sea válido
            if (!cartId) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            console.log("estoy en current adentro del try pase el primer if");
            // Busca el carrito en el servicio usando el cartId
            console.log('ID del carrito:', cartId);
            const cart = await cartService.getCartDetails(cartId);
            console.log('estoy en current - Carrito obtenido:', cart);

            if (!cart) {
                console.log("no pase el if de cart");
                console.log("Carrito no encontrado para el usuario:", userId);
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            console.log("estoy en current y pase al final", cart);
            res.json(cart);
            
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            res.status(500).json({ message: 'Error al cargar el carrito' });
        }
    }

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
            const userId = req.body.userId; // Obtener el userId del cuerpo de la solicitud
            const newCart = await cartService.createNewCart(userId);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear carrito' });
        }
    }

    async viewCartManage(req, res) {
        try {
            const userId = req.user._id; // Asegúrate de que req.user esté definido
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

    // Ejemplo en tu controlador
    // En tu controlador
async addProductCart(req, res) {
    console.log("estoy en controller - addProductCart");
    try {
        console.log("entre al try en addproductcart");
        const { cartId, productId } = req.params; // Asegúrate de que estos son los nombres correctos
        const { quantity } = req.body;
        // Verificar los parámetros
        console.log("Parámetros en addProductCart:", cartId, productId, quantity);
        // Lógica para agregar el producto al carrito
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
