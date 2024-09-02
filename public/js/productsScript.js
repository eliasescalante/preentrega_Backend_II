// Mensaje para saber si carga el script
console.log('productsScript.js cargado');
// evento cuando el contenido del DOM se cargo
document.addEventListener('DOMContentLoaded', () => {
    console.log('productsScript.js cargado');
    // agrego evento al boton
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
});

// Función para agregar un producto al carrito
async function addToCart(productId) {
    try {
        // obtengo la lista de carritos
        const cartsResponse = await fetch('/carts/all');
        if (!cartsResponse.ok) {
            throw new Error('No se pudo obtener la lista de carritos');
        }
        const carts = await cartsResponse.json();

        if (carts.length === 0) {
            throw new Error('No hay carritos disponibles');
        }
        // Mostrar la ventana SweetAlert con el dropdown de carritos
        const { value: selectedCartId } = await Swal.fire({
            title: 'Selecciona un carrito',
            input: 'select',
            inputOptions: carts.reduce((options, cart) => {
                options[cart._id] = `${cart._id}`;
                return options;
            }, {}),
            inputPlaceholder: 'Selecciona un carrito',
            showCancelButton: true
        });

        if (selectedCartId) {
            // envio la solicitud para agregar el producto al carrito
            const response = await fetch(`/carts/${selectedCartId}/products/${productId}/add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: result.message
            });
            console.log('Seleccionado el carrito:', selectedCartId);
            console.log('Producto a agregar:', productId);
            console.log('Cuerpo del request:', { quantity: 1 });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al agregar el producto al carrito'
        });
    }
}

