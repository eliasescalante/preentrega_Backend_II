import { createHash, isValidPassword } from "../utils/util.js";
//Importamos el repository: 
import userRepository from "../repositories/user.repository.js";
import cartService from './cart.service.js';

class UserService {
    async registerUser(userData) {
        const existeUsuario = await userRepository.getUserByEmail(userData.email);
        if (existeUsuario) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password);
        //Para crear el carrito
        const nuevoCarrito = await cartService.createNewCart();
        userData.cart = nuevoCarrito._id;
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");
        return user;
    }
}

export default new UserService(); 