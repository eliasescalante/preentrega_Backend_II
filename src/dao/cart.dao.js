import Cart from './models/cartModel.js';

class CartDAO {
    async findAll() {
        return await Cart.find().select('_id');
    }

    async create() {
        const newCart = new Cart()
        return await newCart.save();
    }

    async findById(id) {
        console.log('estoy en dao.findbyid - Carrito encontrado:', id);
        return await Cart.findById(id).populate('products.product');
        
    }

    async deleteById(id) {
        return await Cart.findByIdAndDelete(id);
    }

    async updateCart(id, data) {
        return await Cart.findByIdAndUpdate(id, data, { new: true });
    }

    // src/dao/cart.dao.js
    async findByUserId(userId) {
        return await Cart.findOne({ userId }); // Asegúrate de que 'userId' es el campo correcto en tu modelo
    }

}

export default new CartDAO();

