import cartDAO from '../dao/cart.dao.js';

class CartRepository {
    async getCarts() {
        return await cartDAO.findAll();
    }

    async createCart() {
        return await cartDAO.create();
    }

    async getCartById(id) {
        return await cartDAO.findById(id);
    }

    async deleteCart(id) {
        return await cartDAO.deleteById(id);
    }

    async updateCart(id, data) {
        return await cartDAO.updateCart(id, data);
    }

    async getCartByUserId(userId) {
        return await cartDAO.findByUserId(userId); // Asegúrate de que esta función esté en cartDAO
    }
}

export default new CartRepository();


