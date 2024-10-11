import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.post('/register', UserController.register);
router.get('/register', (req, res) => {res.render('register');});
router.post('/login', UserController.login);
router.get("/current", passport.authenticate("current", {session: false}), UserController.current);
router.get('/login', (req, res) => {res.render('login');});
router.post("/logout", UserController.logout);


export default router;