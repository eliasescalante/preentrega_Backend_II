// evento cuando el contenido del DOM se cargo
document.addEventListener('DOMContentLoaded', () => {
    console.log('productsScript.js cargado');
    // agrego evento al boton
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-product-id');
            await addToCart(productId);
        });
    });
});

// Función para agregar un producto al carrito
// productScript.js

async function addToCart(productId) {
// Obtener el producto del servidor
    try {
        const response = await fetch('/carts/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        console.log("Paso el try y estoy en la llamada a /carts/current", response);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const currentCart = await response.json();

        if (!currentCart || !currentCart._id) {
            return Swal.fire('Error', 'No se pudo encontrar el carrito del usuario', 'error');
        }

        const cartId = currentCart._id;

        // Agregar producto al carrito del usuario logueado
        const addResponse = await fetch(`/carts/${cartId}/products/${productId}/add`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: 1 }) // La cantidad se establece en 1 por defecto
        });

        // Verificar si la solicitud de agregar fue exitosa
        const result = await addResponse.json();

        // Comprobar si el producto fue agregado exitosamente al carrito
        if (result.success) {
            Swal.fire('Producto agregado', 'El producto se ha agregado al carrito', 'success');
        } else {
            Swal.fire('Error', result.message || 'No se pudo agregar el producto', 'error');
        }
    } catch (error) {
        Swal.fire('Error', `Hubo un problema al agregar el producto al carrito: ${error.message}`, 'error');
    }
}



