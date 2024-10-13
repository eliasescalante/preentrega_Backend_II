import cartDAO from '../dao/cart.dao.js';

class CartRepository {
// Obtiene todos los carritos de la base de datos
    async getCarts() {
        return await cartDAO.findAll();
    }

    async createCart() {
    // Crea un nuevo carrito en la base de datos
        return await cartDAO.create();
    }

    async getCartById(id) {
    // Obtiene un carrito por su id
        return await cartDAO.findById(id);
    }

    async deleteCart(id) {
    // Elimina un carrito por su id
        return await cartDAO.deleteById(id);
    }

    async updateCart(id, data) {
    // Actualiza un carrito por su id
        return await cartDAO.updateCart(id, data);
    }

    async findCartByUserId(userId) {
    // Obtiene un carrito por el id del usuario
        return await cartDAO.findByUserId(userId);
    }
}

export default new CartRepository();


