import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import alumnosRoutes from './routes/alumnosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import { connectDB } from './db.js';

dotenv.config();

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Conectar a base de datos
connectDB();

// Rutas
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
