// src/routes/sessions.js
//quedo en des-uso / dejo el archivo para preguntar despues si la estrategia es valida
import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import {authenticateUser, isAuthenticated} from '../middleware/auth.js';

const router = Router();

router.post('/login', isAuthenticated, UserController.login);
router.get('/current', authenticateUser, UserController.current);
router.get('/logout', UserController.logout);

export default router;
