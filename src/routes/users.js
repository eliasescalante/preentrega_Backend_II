import { Router } from "express";
import UserModel from "../models/userModel.js";
import Cart from '../models/cartModel.js';
import {createHash, isValidPassword} from "../utils/util.js";
import jwt from "jsonwebtoken";
import passport from "passport";
const router = Router();

//ruta a register
router.get("/register", (req, res) =>{
    res.render("register");
})
//ruta a login
router.get("/login", (req, res) => {
    res.render("login"); 
})
//ruta a current
router.get("/current", passport.authenticate("current", {session: false}), (req,res)=> {
    console.log(req.user); // Para depurar
    res.render("home", {
        first_name: req.user.usuario,
        cart_id: req.user.cart // Incluye el ID del carrito
    });

})



//Register
router.post("/register", async(req, res) => {
    const { nombre, apellido, age, email, password } = req.body;

    try {
        //verifico si ya existe el usuario
        const existeUsuario = await UserModel.findOne({ nombre });

        if (existeUsuario) {
            return res.status(400).send("El usuario ya esta registrado")
        }

         // Si no existe, creo el carrito
        const nuevoCarrito = new Cart();
        await nuevoCarrito.save();

        //si no existe, lo creo:
        const nuevoUsuario = new UserModel({
            first_name: nombre,
            last_name: apellido,
            age,
            email,
            password: createHash(password),
            cart: nuevoCarrito._id, // Asocia el ID del carrito al usuario
        });
        
        await nuevoUsuario.save();

        console.log('paso');

        // Genero el token JWT
        const token = jwt.sign({
            usuario: nuevoUsuario.first_name,
            cart: nuevoUsuario.cart
        }, "coderhouse", {expiresIn: "1h"});

        console.log('paso');

        //Lo mandamos con la cookie
        res.cookie("cookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
        })

        console.log('paso');

        res.redirect("/api/sessions/current");

        console.log('paso');

    } catch (error) {
        console.error("Error en el registro:", error); // Agrega esta línea
        res.status(500).send("Error interno del servidor")
    }


})

//Login
router.post("/login", async(req, res) =>{
    const {first_name, password} = req.body;

    try {
        
        const usuarioEncontrado = await UserModel.findOne({first_name});
        console.log("Datos de login:", req.body);


        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no registrado, ir a api/sessions/register, para registrarte");
        }

        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Contraseña incorrecta");
        }


        // generamos el token
        const token = jwt.sign({usuario: usuarioEncontrado.first_name, rol: usuarioEncontrado.rol, cart: usuarioEncontrado.cart}, "coderhouse", {expiresIn: "1h"});
        res.cookie("cookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
        })
        console.log("Token generado:", token);


        res.redirect("/api/sessions/current")
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


//Logout
router.post("/logout", (req, res) => {
    res.clearCookie("cookieToken");
    res.redirect("/api/sessions/login");
})

export default router;