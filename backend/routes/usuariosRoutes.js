import express from 'express';
import { loginUsuario, registrarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registrarUsuario);

// Ruta para login de usuario
router.post('/login', loginUsuario);

export default router;
