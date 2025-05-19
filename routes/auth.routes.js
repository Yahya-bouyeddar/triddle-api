import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// 🟢 Route pour s’enregistrer
router.post('/register', registerUser);

// 🟢 Route pour se connecter
router.post('/login', loginUser);

export default router;
