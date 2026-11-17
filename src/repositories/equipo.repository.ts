import { pool } from '../config/db';

export interface Equipo {
  id?: number;
  nombre: string;
  tipo: string;
  estado: string;
  fecha_adquisicion: Date;
  ultimo_service: Date;
}

export class EquipoRepository {
  // Guarda un nuevo equipo en la base de datos
  static async crear(equipo: Equipo): Promise<Equipo> {
    const query = `
      INSERT INTO equipos (nombre, tipo, estado, fecha_adquisicion, ultimo_service)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const valores = [equipo.nombre, equipo.tipo, equipo.estado, equipo.fecha_adquisicion, equipo.ultimo_service];
    
    const { rows } = await pool.query(query, valores);
    return rows[0];
  }

  // Trae todos los equipos guardados
  static async obtenerTodos(): Promise<Equipo[]> {
    const { rows } = await pool.query('SELECT * FROM equipos');
    return rows;
  }
}