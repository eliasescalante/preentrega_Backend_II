import cartRepository from '../repositories/cart.repository.js';
import mongoose from 'mongoose';
import Cart from '../dao/models/cartModel.js';

class CartService {
    async getAllCarts() {
    // Método para obtener todos los carritos
        return await cartRepository.getCarts();
    }

    async createNewCart(userId) {
    // Método para crear un nuevo carrito
        return await cartRepository.createCart(userId);
    }

    async getCartDetails(id) {
    // Método para obtener los detalles de un carrito
        return await cartRepository.getCartById(id);
    }

    async deleteCartById(id) {
    // Método para eliminar un carrito por su id
        return await cartRepository.deleteCart(id);
    }

    async addOrUpdateProductInCart(cartId, productId, quantity) {
    // Método para agregar o actualizar un producto en un carrito
        try {
            const cartObjectId = new mongoose.Types.ObjectId(cartId);
            const productObjectId = new mongoose.Types.ObjectId(productId);
    
            const cart = await cartRepository.getCartById(cartObjectId);
            if (!cart) throw new Error('Carrito no encontrado');
    
            const productIndex = cart.products.findIndex(p => p.product.equals(productObjectId));
    
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productObjectId, quantity });
            }
            // actualizo el carrito en la base de datos
            const updatedCart = await cartRepository.updateCart(cartObjectId, { products: cart.products });
            return updatedCart;
        } catch (error) {
            console.error("Error al agregar/modificar el producto en el carrito:", error.message);
            throw new Error("Error al agregar/modificar el producto en el carrito");
        }
    }
    
    async modifyProductQuantity(cartId, productId, newQuantity) {
    // Método para modificar la cantidad de un producto en un carrito
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            const productIndex = cart.products.findIndex(p => p.product.equals(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }
            cart.products[productIndex].quantity = newQuantity;

            const updatedCart = await cartRepository.updateCart(cartId, cart);
            return updatedCart;
        } catch (error) {
            console.error("Error al modificar la cantidad del producto en el carrito:", error.message);
            throw new Error("Error al modificar la cantidad del producto en el carrito");
        }
    }

    async deleteProductInCart(cartId, productId) {
    // Método para eliminar un producto de un carrito
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            const productIndex = cart.products.findIndex(p => p.product.equals(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            cart.products.splice(productIndex, 1);
            return await cartRepository.updateCart(cartId, cart);
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error.message);
            throw new Error("Error al eliminar el producto del carrito");
        }
    }

    async emptyCart(cartId) {
    // Método para vaciar un carrito
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            cart.products = [];
            return await cartRepository.updateCart(cartId, cart);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error.message);
            throw new Error("Error al vaciar el carrito");
        }
    }

    async getCartByUserId(cardId) {
    // Método para obtener un carrito por id de usuario
        try {
            return await cartRepository.findCartByUserId(cardId);
        } catch (error) {
            console.error('Error al obtener el carrito del usuario:', error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate('products.product');
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error; 
        }
    }

}

export default new CartService();
