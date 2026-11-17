import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexion exitosa a PostgreSQL');
    client.release();
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
};