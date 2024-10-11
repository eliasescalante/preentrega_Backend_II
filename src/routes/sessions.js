// src/routes/sessions.js
import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import authenticateUser from '../middleware/auth.js'; // Asegúrate de que la ruta sea correcta

const router = Router();

router.post('/login', UserController.login);
router.get('/current', authenticateUser, UserController.current); // Aplica el middleware aquí
router.get('/logout', UserController.logout);

export default router;
