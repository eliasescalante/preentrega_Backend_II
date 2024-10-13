// src/routes/sessions.js
import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import {authenticateUser} from '../middleware/auth.js';

const router = Router();

router.post('/login', UserController.login);
router.get('/current', authenticateUser, UserController.current);
router.get('/logout', UserController.logout);

export default router;
