document.getElementById('createCartButton').addEventListener('click', () => {
    fetch('/carts/create', { method: 'POST' })
        .then(() => window.location.reload())
        .catch(error => console.error('Error:', error));
});

function viewCart(cartId) {
    window.location.href = `/carts/${cartId}`;
}

function deleteCart(cartId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/carts/${cartId}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire(
                        'Eliminado!',
                        'El carrito ha sido eliminado.',
                        'success'
                    ).then(() => window.location.reload());
                })
                .catch(error => console.error('Error:', error));
        }
    });
}