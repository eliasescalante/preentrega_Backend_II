//Modelo para carrito
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required : true},
            quantity: { type: Number, required: true}
        }
    ]
});

module.exports =  mongoose.model('Cart', cartSchema);

