import Product from './models/productModel.js';

class ProductDAO {
    async createProduct(data) {
    // Método para crear un nuevo producto
        return await Product.create(data);
    }

    async paginateProducts(filter, options) {
    // Método para obtener los productos paginados
        return await Product.paginate(filter, options);
    }

    async findProductById(id) {
    // Método para obtener un producto por su id
        return await Product.findById(id);
    }

    async deleteProductById(id) {
    // Método para eliminar un producto por su id
        return await Product.findByIdAndDelete(id);
    }
}
export default new ProductDAO();
