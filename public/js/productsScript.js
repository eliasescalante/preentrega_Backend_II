console.log('productsScript.js cargado');

// public/js/productsScript.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('productsScript.js cargado');

    // Asumiendo que tienes botones con la clase 'add-to-cart-btn'
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
});

async function addToCart(product) {
    console.log('Intentando agregar producto al carrito:', product);
    try {
        if (!product) {
            console.error('ID del producto no válido');
            return;
        }

        // Obtén la lista de carritos
        const cartsResponse = await fetch('/carts/all');
        const carts = await cartsResponse.json();

        console.log('Carritos obtenidos:', carts);

        if (carts.length === 0) {
            console.error('No hay carritos disponibles');
            return;
        }

        // Muestra la ventana SweetAlert con el dropdown de carritos
        const { value: selectedCartId } = await Swal.fire({
            title: 'Selecciona un carrito',
            input: 'select',
            inputOptions: carts.reduce((options, cart) => {
                options[cart._id] = cart._id;
                return options;
            }, {}),
            inputPlaceholder: 'Selecciona un carrito',
            showCancelButton: true
        });

        console.log('Carrito seleccionado:', selectedCartId);

        if (!selectedCartId) {
            console.error('No se seleccionó un carrito');
            return;
        }

        // Agrega el producto al carrito seleccionado
        const addResponse = await fetch(`/carts/${selectedCartId}/products/${product}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ quantity: 1 })  // Cantidad predeterminada
        });

        const result = await addResponse.json();
        console.log('Respuesta del servidor:', result);

        if (addResponse.ok) {
            Swal.fire('Éxito', 'Producto agregado al carrito', 'success');
        } else {
            throw new Error(result.message || 'Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        Swal.fire('Error', error.message || 'No se pudo agregar el producto al carrito', 'error');
    }
}
