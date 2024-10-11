// Mensaje para saber si carga el script
console.log('productsScript.js cargado');

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
async function addToCart(productId) {
    try {
        const cartResponse = await fetch('/carts/current');
        console.log(cartResponse)
        if (!cartResponse.ok) {
            const errorText = await cartResponse.text(); // Obtén el mensaje de error del servidor
            console.log(errorText)
            throw new Error(`Error al obtener el carrito: ${errorText}`);
        }
        const cart = await cartResponse.json();
        if (!cart) {
            throw new Error('No hay carrito disponible para este usuario.');
        }

        // Resto de tu lógica...
    } catch (error) {
        console.error('Error en addToCart:', error); // Esto te ayudará a ver qué está fallando
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al agregar el producto al carrito'
        });
    }
}
