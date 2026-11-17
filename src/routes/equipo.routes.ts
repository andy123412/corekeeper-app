import { Router } from 'express';
import { EquipoRepository } from '../repositories/equipo.repository';
import { Reloj } from '../utils/reloj';

export const equipoRouter = Router();

// Ruta para CREAR un equipo nuevo
equipoRouter.post('/', async (req, res) => {
  try {
    const { nombre, tipo, estado } = req.body;
    const ahora = Reloj.ahora(); // Usamos nuestra utilidad para fijar la hora

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
});

// Ruta para VER todos los equipos
equipoRouter.get('/', async (req, res) => {
  try {
    const equipos = await EquipoRepository.obtenerTodos();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
});