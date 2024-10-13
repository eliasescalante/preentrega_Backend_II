import Cart from './models/cartModel.js';

class CartDAO {
    async findAll() {
    // Método para encontrar todos los carritos, solo devuelve los IDs
        return await Cart.find().select('_id');
    }

    async create() {
    // Método para crear un nuevo carrito
        const newCart = new Cart()
        return await newCart.save();
    }

    async findById(id) {
    // Método para encontrar un carrito por su ID
        return await Cart.findById(id).populate('products.product');
        
    }

    async deleteById(id) {
     // Método para eliminar un carrito por su ID
        return await Cart.findByIdAndDelete(id);
    }

    async updateCart(id, data) {
    // Método para actualizar un carrito por su ID
        return await Cart.findByIdAndUpdate(id, data, { new: true });
    }

    async findByUserId(userId) {
    // Método para encontrar un carrito por el ID del usuario
        return await Cart.findOne({ userId });
    }
}
export default new CartDAO();

