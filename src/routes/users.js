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
    console.log(req.user); // para depurar
    res.render("home", {
        email: req.user.usuario,
        cart_id: req.user.cart
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
        //si no existe el usuario, lo creo:
        const nuevoUsuario = new UserModel({
            first_name: nombre,
            last_name: apellido,
            age,
            email,
            password: createHash(password),
            cart: nuevoCarrito._id, // Asocia el ID del carrito al usuario
        });
        await nuevoUsuario.save();
        // Genero el token JWT
        const token = jwt.sign({
            usuario: nuevoUsuario.email,
            cart: nuevoUsuario.cart
        }, "coderhouse", {expiresIn: "1h"});
        //envio el token con la cookie
        res.cookie("cookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
        })
        //mensaje para depurar donde corta el flujo
        console.log('paso');
        res.redirect("/api/sessions/current");
        //mensaje para depurar donde corta el flujo
    } catch (error) {
        console.error("Error en el registro:", error); // para ver porque fallo
        res.status(500).send("Error interno del servidor")
    }
})

//Login
router.post("/login", async(req, res) =>{
    const {email, password} = req.body;
    try {
        // Busco el usuario por su nombre
        const usuarioEncontrado = await UserModel.findOne({email});
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no registrado, ir a api/sessions/register, para registrarte");
        }
        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Contraseña incorrecta");
        }
        // genero el token
        const token = jwt.sign({usuario: usuarioEncontrado.email, rol: usuarioEncontrado.rol, cart: usuarioEncontrado.cart}, "coderhouse", {expiresIn: "1h"});
        // envio el token como una cookie
        res.cookie("cookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
        })
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