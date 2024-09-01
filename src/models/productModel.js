// defino el esquema para los productos

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: [String] // Array de Strings para las URLs de las imágenes
});
// creo el modelo Product
const Product = mongoose.model('Product', productSchema);
// exporto el modelo para ser usado
module.exports = Product;
