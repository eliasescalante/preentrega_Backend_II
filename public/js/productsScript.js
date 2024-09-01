document.querySelector('form').addEventListener('submit', function (event) {
    const limit = parseInt(document.getElementById('limit').value, 10);
    const page = parseInt(document.getElementById('page').value, 10);

    if (limit <= 0 || page <= 0) {
        // Usar SweetAlert2 para mostrar un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Limit and page must be greater than 0.',
            confirmButtonText: 'OK'
        });
        event.preventDefault(); // Previene el envío del formulario
    }
});

    // Función para agregar un producto al carrito
function addToCart(productId) {
    // Obtener la lista de carritos desde el servidor (esto es un ejemplo, ajusta según tu ruta y datos)
    fetch('/carts')
        .then(response => response.json())
        .then(data => {
            // Crear un dropdown con los carritos disponibles
            const cartOptions = data.carts.map(cart => `<option value="${cart._id}">${cart._id}</option>`).join('');
            
            // Mostrar SweetAlert2 con el dropdown para seleccionar el carrito
            Swal.fire({
                title: 'Selecciona un carrito',
                input: 'select',
                inputOptions: {
                    'carritos': cartOptions
                },
                inputPlaceholder: 'Selecciona un carrito',
                showCancelButton: true,
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    // Obtener el carrito seleccionado
                    const selectedCart = result.value;

                    // Enviar la solicitud para agregar el producto al carrito
                    fetch(`/carts/${selectedCart}/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ quantity: 1 }) // Puedes ajustar la cantidad según sea necesario
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Mostrar mensaje de éxito
                        Swal.fire('Producto agregado', '', 'success');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire('Error al agregar el producto', '', 'error');
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los carritos:', error);
            Swal.fire('Error al obtener los carritos', '', 'error');
        });
}