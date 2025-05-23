import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Importante para Azure SQL Database
    trustServerCertificate: true // En producción debe ser falso
  }
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado exitosamente a la base de datos SQL Server 🚀');
  } catch (error) {
    console.error('Error de conexión a base de datos:', error.message);
    process.exit(1); // Sale si falla
  }
};

export { connectDB, sql };
