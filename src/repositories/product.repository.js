import productDAO from '../dao/product.dao.js';
import productModel from '../dao/models/productModel.js';

class ProductRepository {
    async addProduct(data) {
    // Agrega un nuevo producto a la base de datos
        return await productDAO.createProduct(data);
    }

    async getProducts(filter, options) {
    // Obtiene una lista de productos de la base de datos
        return await productDAO.paginateProducts(filter, options);
    }

    async getProductById(id) {
    // Obtiene un producto específico de la base de datos
        return await productDAO.findProductById(id);
    }

    async removeProduct(id) {
    // Elimina un producto de la base de datos
        return await productDAO.deleteProductById(id);
    }

    async updateProductStock(productId, newStock) {
        // Actualiza el stock de un producto en la base de datos
        return await productDAO.findByIdAndUpdate(productId, { stock: newStock });
    }

    async findById(productId) {
        // Busca un producto por su ID en la base de datos
        try {
            const product = await productModel.findById(productId).exec();
            return product;
        } catch (error) {
            console.error('Error al buscar el producto por ID:', error);
            throw new Error('Error al buscar el producto');
        }
    }
}

export default new ProductRepository();
