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