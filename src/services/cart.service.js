import cartRepository from '../repositories/cart.repository.js';
import mongoose from 'mongoose';

class CartService {
    async getAllCarts() {
        return await cartRepository.getCarts();
    }

    async createNewCart(userId) {
        return await cartRepository.createCart(userId);
    }

    async getCartDetails(id) {
        return await cartRepository.getCartById(id);
    }

    async deleteCartById(id) {
        return await cartRepository.deleteCart(id);
    }

    async addOrUpdateProductInCart(cartId, productId, quantity) {
        console.log("estoy en service-", cartId, productId, quantity);
        try {
            console.log("estoy en service cart dentro del try");
            const cartObjectId = new mongoose.Types.ObjectId(cartId);
            const productObjectId = new mongoose.Types.ObjectId(productId);
    
            const cart = await cartRepository.getCartById(cartObjectId);
            console.log('Carrito después de buscar en cart service:', cart); // Agregar log aquí
            if (!cart) throw new Error('Carrito no encontrado');
    
            // Buscar el producto por su ID
            const productIndex = cart.products.findIndex(p => p.product.equals(productObjectId));
    
            if (productIndex > -1) {
                // Si el producto ya existe, actualizar cantidad
                cart.products[productIndex].quantity += quantity;
            } else {
                // Si no existe, añadir nuevo producto
                cart.products.push({ product: productObjectId, quantity });
            }
    
            // Actualizar el carrito en la base de datos
            const updatedCart = await cartRepository.updateCart(cartObjectId, { products: cart.products });
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

        // src/services/cart.service.js
    async getCartByUserId(userId) {
        try {
            return await cartRepository.findCartByUserId(userId); // Asegúrate de que esta función exista y funcione correctamente
        } catch (error) {
            console.error('Error al obtener el carrito del usuario:', error);
            throw error;
        }
    }

}

export default new CartService();
