import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
import {authenticateUser, isAuthenticated} from '../middleware/auth.js';

const router = Router();
//Rutas
router.post('/register', UserController.register);
router.get('/register', (req, res) => {res.render('register');});
router.post('/login', UserController.login);
router.get("/current", passport.authenticate("current", {session: false}), UserController.current);
router.get('/login', isAuthenticated, UserController.renderLogin);
router.post("/logout", UserController.logout);

export default router;