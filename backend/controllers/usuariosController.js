import { sql } from '../db.js';
import bcrypt from 'bcryptjs';

export const registrarUsuario = async (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await sql.query(`
      INSERT INTO Usuarios (usuario, contraseña)
      VALUES (@usuario, @contraseña)
    `, {
      usuario: usuario,
      contraseña: hashedPassword
    });
    
    res.status(201).json({ mensaje: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

export const loginUsuario = async (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const resultado = await sql.query`
      SELECT * FROM Usuarios WHERE usuario = ${usuario}
    `;

    const user = resultado.recordset[0];

    if (!user) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
    }

    const passwordValido = await bcrypt.compare(contraseña, user.contraseña);

    if (!passwordValido) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta.' });
    }

    res.status(200).json({ mensaje: 'Login exitoso.' });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
