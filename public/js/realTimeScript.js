// script para manejar el DOM en realTimerProducts.handlebars

const socket = io();
const form = document.getElementById('productForm');
const tableBody = document.querySelector('#productsTable tbody');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    socket.emit('addProduct', Object.fromEntries(formData.entries()));
    form.reset();
});

socket.on('updateProducts', (products) => {
    if (Array.isArray(products)) {
        tableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.code}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td><img src="${product.thumbnails}" alt="${product.title}"></td>
                <td><button class="delete-button" data-id="${product._id}">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });
        attachDeleteEvent();
    } else {
        console.error('Products is not an array');
    }
});

function attachDeleteEvent() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit('deleteProduct', productId);
                }
            });
        });
    });
}