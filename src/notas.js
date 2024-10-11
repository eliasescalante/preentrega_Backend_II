/*

video after hasta el 16:10


async finalizarCompra(req, res) {
    const cartId = req.params.cid;
    try {
        
        const cart = await cartRepository.obtenerProductosDeCarrito(cartId);
        const products = cart.products;
        
        const productosNoDisponibles = [];
        for (const item of products) {
            const productId = item.product;
            const product = await productRepository.obtenerProductoPorId(productId);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
            } else {
                productosNoDisponibles.push(productId);
            }
        }

        const userWithCart = await UserModel.findOne({ cart: cartId });

        const ticket = new TicketModel({
            code: generateUniqueCode(),
            purchase_datetime: new Date(),
            amount: calcularTotal(cart.products),
            purchaser: userWithCart._id
        });
        await ticket.save();
        cart.products = cart.products.filter(item => productosNoDisponibles.some(productId => productId.equals(item.product)));
        await cart.save();
        
        await emailManager.enviarCorreoCompra(userWithCart.email, userWithCart.first_name, ticket._id);
        
        
        res.render("checkout", {
            cliente: userWithCart.first_name,
            email: userWithCart.email,
            numTicket: ticket._id 
        });
} catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
    */