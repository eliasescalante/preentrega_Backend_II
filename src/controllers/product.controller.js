import productService from '../services/product.service.js';

class ProductController {
    // Método para agregar un nuevo producto
    async addProduct(req, res) {
        try {
            const newProduct = await productService.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            res.status(400).send(error.message);
        }
    }

    async getProduct(req, res) {
        // Método para obtener todos los productos
        try {
            const result = await productService.getProducts(req.query);
            res.render('products', {
                products: result.docs,
                currentPage: result.page,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPreviousPage: result.hasPrevPage,
                nextPage: result.nextPage,
                previousPage: result.prevPage,
                limit: result.limit,
                sort: req.query.sort,
                query: req.query.query,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }

    async getDetailProduct(req, res) {
        // Método para obtener los detalles de un producto específico
        try {
            const product = await productService.getProductDetails(req.params.id);
            res.render('productDetails', { product });
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    async deleteProduct(req, res) {
        // Método para eliminar un producto
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
export default new ProductController();
