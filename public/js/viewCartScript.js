//Función para modificar la cantidad de un producto en el carrito
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
                    Swal.fire(
                        'Actualizado!', 'La cantidad se ha modificado correctamente.', 'success'
                    ).then(()=>window.location.reload());
                    
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

// Script en la vista
// Función de compra en el frontend
async function finalizarCompra(cartId) {
    try {
        const response = await fetch(`/carts/${cartId}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            //ticket en SweetAlert
            Swal.fire({
                title: 'Compra finalizada con éxito',
                html: `
                    <p><strong>Ticket ID:</strong> ${data.ticket.id}</p>
                    <p><strong>Total:</strong> $${data.ticket.amount}</p>
                    <p><strong>Comprador:</strong> ${data.ticket.purchaser}</p>
                    <p>${data.productosNoDisponibles.length > 0 ? 
                        'Algunos productos no estaban disponibles en stock:' : 
                        'Todos los productos fueron comprados con éxito'}</p>
                    ${data.productosNoDisponibles.map(productId => `<p>Producto ID: ${productId}</p>`).join('')}
                `,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(async () => {
                // Solo vacía el carrito y recarga la página después de presionar "OK"
                await fetch(`/carts/${cartId}/empty`, { method: 'PUT' });
                window.location.reload();
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                title: 'Error al finalizar la compra',
                text: errorData.message || 'Ocurrió un error inesperado',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo completar la compra.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
}



