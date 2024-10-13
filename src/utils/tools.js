// Función para generar un código alfanumérico aleatorio
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos
    let randomCode = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); // Generar un índice aleatorio
        randomCode += characters[randomIndex]; // Añadir el carácter correspondiente al código
    }
    return randomCode; // Retornar el código generado
}

function sumTotal(products){
    let total = 0;
    products.forEach(product => {
        total += product.price * product.quantity;
    });
    return total;
}

// Exportar la función para que pueda ser utilizada en otros módulos
export default generateRandomCode;


