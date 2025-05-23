import express from 'express';
import { registrarAlumno, obtenerAlumnos } from '../controllers/alumnosController.js';

const router = express.Router();

// Ruta para registrar alumno (con predicción de deserción)
router.post('/registrar', registrarAlumno);

// Ruta para obtener alumnos registrados
router.get('/listar', obtenerAlumnos);

export default router;
