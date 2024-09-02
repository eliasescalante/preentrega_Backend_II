//NO FUNCIONA POR AHORA TENGO QUE DEPURAR!!!!

// Función para actualizar la vista del carrito
// Conectar con Socket.IO
const socket = io();

// Escuchar actualizaciones del carrito
socket.on('updateCart', (cart) => {
    console.log('Carrito actualizado:', cart);
    updateCartView(cart);
});

// Función para actualizar la vista del carrito
function updateCartView(cart) {
    const cartContainer = document.querySelector('.cart-container'); // Verifica si esta clase existe
    cartContainer.innerHTML = ''; // Limpiar el contenido actual

    if (cart.products.length) {
        cart.products.forEach(product => {
            cartContainer.innerHTML += `
                <div class="cart-card">
                    <h2>Producto: ${product.product.title}</h2>
                    <p>Precio: $${product.product.price}</p>
                    <p>Cantidad: ${product.quantity}</p>
                    <button class="btn" onclick="modifyQuantity('${cart._id}', '${product.product._id}')">Modificar Cantidad</button>
                    <button class="btn btn-danger" onclick="removeProduct('${cart._id}', '${product.product._id}')">Eliminar Producto</button>
                </div>
            `;
        });
    } else {
        cartContainer.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
    }
}



function modifyQuantity(cartId, productId) {
    Swal.fire({
        title: 'Modificar Cantidad',
        input: 'number',
        inputLabel: 'Cantidad',
        inputPlaceholder: 'Introduce la nueva cantidad',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debes introducir una cantidad!';
            }
            if (isNaN(value) || value <= 0) {
                return 'La cantidad debe ser un número positivo!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const quantity = parseInt(result.value, 10);
            console.log('Realizando solicitud para:', `/carts/${cartId}/products/${productId}/quantity`);
            fetch(`/carts/${cartId}/products/${productId}/quantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                if (data.success) {
                    Swal.fire('Actualizado!', 'La cantidad se ha modificado correctamente.', 'success');
                } else {
                    Swal.fire('Error!', 'No se pudo actualizar la cantidad.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error!', 'Hubo un error al actualizar la cantidad.', 'error');
            });
        }
    });
}


// Función para eliminar un producto del carrito
function removeProduct(cartId, productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/carts/${cartId}/products/${productId}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el producto');
                    }
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    ).then(() => window.location.reload());
                })
                .catch(error => console.error('Error:', error));
        }
    });
}

// Función para vaciar un carrito
function emptyCart(cartId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/carts/${cartId}/empty`, { method: 'PUT' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al vaciar el carrito');
                    }
                    Swal.fire(
                        'Vaciado!',
                        'El carrito ha sido vaciado.',
                        'success'
                    ).then(() => window.location.reload());
                })
                .catch(error => console.error('Error:', error));
        }
    });
}
