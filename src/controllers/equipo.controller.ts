import { Request, Response } from 'express';
import { EquipoRepository } from '../repositories/equipo.repository';
import { EquipoService } from '../services/equipo.service';
import { Reloj } from '../utils/reloj';

export class EquipoController {
  
  // Función para crear (con validación)
  static async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, tipo, estado } = req.body;

      //  VALIDACIÓN DE ENTRADA: Si falta nombre o tipo, rebotamos la petición
      if (!nombre || !tipo) {
        res.status(400).json({ error: 'El nombre y el tipo son campos obligatorios.' });
        return;
      }

      const ahora = Reloj.ahora();
      const nuevoEquipo = await EquipoRepository.crear({
        nombre,
        tipo,
        estado: estado || 'operativo',
        fecha_adquisicion: ahora,
        ultimo_service: ahora
      });
      
      res.status(201).json(nuevoEquipo);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el equipo' });
    }
  }

  // Función para listar todos
  static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const equipos = await EquipoRepository.obtenerTodos();
      res.json(equipos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los equipos' });
    }
  }

  // Función para ver las alertas
  static async obtenerAlertas(req: Request, res: Response): Promise<void> {
    try {
      const todosLosEquipos = await EquipoRepository.obtenerTodos();
      const equiposEnPeligro = todosLosEquipos.filter(equipo => 
        EquipoService.requiereService(equipo)
      );
      
      res.json({
        total_alertas: equiposEnPeligro.length,
        equipos: equiposEnPeligro
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al calcular alertas' });
    }
  }
}