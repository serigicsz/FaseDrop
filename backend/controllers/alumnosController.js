import { sql } from '../db.js';
import { predecirDesercion } from '../services/predictionService.js';

// 👉 Función para registrar un alumno
export const registrarAlumno = async (req, res) => {
  const datos = req.body;

  if (!datos.nombre || !datos.apellido) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
  }

  try {
    // 🔵 Predicción real usando tu modelo
    const desercion = await predecirDesercion(datos);

    await sql.query`
      INSERT INTO Alumnos (
        nombre, apellido, grado, seccion, edad, conducta,
        matematicas, comunicacion, ciencias_sociales, cta, ingles,
        distrito, comentarios, tipoPeriodo, nombrePeriodo, asistencia, desercion
      )
      VALUES (
        ${datos.nombre}, ${datos.apellido}, ${datos.grado}, ${datos.seccion},
        ${datos.edad}, ${datos.conducta}, ${datos.matematicas}, ${datos.comunicacion},
        ${datos.ciencias_sociales}, ${datos.cta}, ${datos.ingles},
        ${datos.distrito}, ${datos.comentarios}, ${datos.tipoPeriodo},
        ${datos.nombrePeriodo}, ${datos.asistencia}, ${desercion}
      )
    `;

    res.status(201).json({ mensaje: 'Alumno registrado exitosamente.', desercion });
  } catch (error) {
    console.error('Error al registrar alumno:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

// 👉 Función para obtener todos los alumnos
export const obtenerAlumnos = async (req, res) => {
  try {
    const resultado = await sql.query`
      SELECT * FROM Alumnos
    `;
    res.status(200).json(resultado.recordset);
  } catch (error) {
    console.error('Error al listar alumnos:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
