import bcrypt from "bcrypt"; 
// Función para crear un hash de la contraseña
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
// Función para validar si una contraseña coincide con el hash almacenado
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); 
//una idea para generar el codigo del ticket
const generateTicketCode = () => {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 10000); 
    return `TICKET-${timestamp}-${randomNum}`;
}


export {createHash, isValidPassword, generateTicketCode};