import productDAO from '../dao/product.dao.js';

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
}

export default new ProductRepository();
