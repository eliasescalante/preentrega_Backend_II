import Product from './models/productModel.js';

class ProductDAO {
    async createProduct(data) {
        return await Product.create(data);
    }

    async paginateProducts(filter, options) {
        return await Product.paginate(filter, options);
    }

    async findProductById(id) {
        return await Product.findById(id);
    }

    async deleteProductById(id) {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductDAO();
