import cartRepository from '../repositories/cart.repository.js';
import mongoose from 'mongoose';

class CartService {
    async getAllCarts() {
        return await cartRepository.getCarts();
    }

    async createNewCart() {
        return await cartRepository.createCart();
    }

    async getCartDetails(id) {
        return await cartRepository.getCartById(id);
    }

    async deleteCartById(id) {
        return await cartRepository.deleteCart(id);
    }

    async addOrUpdateProductInCart(cartId, productId, quantity) {
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            const productObjectId = new mongoose.Types.ObjectId(productId);
            const productIndex = cart.products.findIndex(p => p.product.equals(productObjectId));

            // Si el producto ya existe, se actualiza la cantidad
            if (productIndex > -1) {
                cart.products[productIndex].quantity += Number(quantity) || 1;
            } else {
                // Si el producto no existe, se agrega al carrito
                cart.products.push({ product: productObjectId, quantity: Number(quantity) || 1 });
            }

            const updatedCart = await cartRepository.updateCart(cartId, cart);
            return updatedCart;
        } catch (error) {
            console.error("Error al agregar/modificar el producto en el carrito:", error.message);
            throw new Error("Error al agregar/modificar el producto en el carrito");
        }
    }

    async modifyProductQuantity(cartId, productId, newQuantity) {
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            const productIndex = cart.products.findIndex(p => p.product.equals(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            // Actualiza la cantidad
            cart.products[productIndex].quantity = newQuantity;

            const updatedCart = await cartRepository.updateCart(cartId, cart);
            return updatedCart;
        } catch (error) {
            console.error("Error al modificar la cantidad del producto en el carrito:", error.message);
            throw new Error("Error al modificar la cantidad del producto en el carrito");
        }
    }

    async deleteProductInCart(cartId, productId) {
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            const productIndex = cart.products.findIndex(p => p.product.equals(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            // Eliminar el producto
            cart.products.splice(productIndex, 1);
            return await cartRepository.updateCart(cartId, cart);
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error.message);
            throw new Error("Error al eliminar el producto del carrito");
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await cartRepository.getCartById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            cart.products = [];  // Vaciar los productos
            return await cartRepository.updateCart(cartId, cart);  // Guardar los cambios
        } catch (error) {
            console.error("Error al vaciar el carrito:", error.message);
            throw new Error("Error al vaciar el carrito");
        }
    }

    async getCartByUserId(userId) {
        const cart = await cartRepository.getCartByUserId(userId);
        if (!cart) {
        throw new Error('Carrito no encontrado'); // Lanzar un error si no se encuentra el carrito
        }
        return cart;
    }
}

export default new CartService();
