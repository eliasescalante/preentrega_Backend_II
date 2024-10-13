import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {

    static async renderLogin(req, res) {
        if (req.session.user) {
            return res.redirect('/api/sessions/current');
        }
        res.render('login'); // Renderiza la vista de login si no está autenticado
    }

    static async register(req, res) {
        // Método para registrar un nuevo usuario
        const { nombre, apellido, age, email, password } = req.body;
        try {
            //verifico si ya existe el usuario
            const nuevoUsuario = await userService.registerUser({first_name: nombre, last_name:apellido, email, age, password});
            const token = jwt.sign({
                usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
                cart : nuevoUsuario.cart,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role
            }, "coderhouse", {expiresIn: "1h"});
            //envio el token con la cookie
            res.cookie("cookieToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            })
            res.redirect("/api/sessions/current");
        } catch (error) {
            console.error("Error en el registro:", error);
            res.status(500).send("Error interno del servidor")
        }
    }

    static async login(req, res) {
        // Método para iniciar sesión
        const { email, password } = req.body;
        try {
            const user = await userService.loginUser(email, password);
            req.session.user = { id: user._id, name: user.first_name, role: user.role, cart: user.cart };
            // genero el token
            const token = jwt.sign({
                usuario: `${user.first_name} ${user.last_name}`,
                cart: user.cart,
                email: user.email,
                role: user.role
            }, "coderhouse", { expiresIn: "1h" });
            // Envio el token como una cookie
            res.cookie("cookieToken", token, {
                maxAge: 3600000,
                httpOnly: true,
            });
            res.redirect("/api/sessions/current");
        } catch (error) {
            console.error("Error en el inicio de sesión:", error.message);
            res.status(500).send("Error interno del servidor");
        }
    }
    
    static async current(req, res) {
        // Método para obtener el usuario actual
        if(req.user) {
            const user = req.user; 
            const userDTO = new UserDTO(user); 
            res.render("home", {user: userDTO});
        } else {
            res.send("No autorizado");
        }
    }

    static async logout(req, res) {
        // Método para cerrar sesión
        res.clearCookie("cookieToken");
        res.redirect("/api/sessions/login");
    }
}
export default UserController;