import productDAO from '../dao/product.dao.js';

class ProductRepository {
    async addProduct(data) {
        return await productDAO.createProduct(data);
    }

    async getProducts(filter, options) {
        return await productDAO.paginateProducts(filter, options);
    }

    async getProductById(id) {
        return await productDAO.findProductById(id);
    }

    async removeProduct(id) {
        return await productDAO.deleteProductById(id);
    }
}

export default new ProductRepository();
