import { Router } from 'express';
import { EquipoRepository } from '../repositories/equipo.repository';
import { Reloj } from '../utils/reloj';
import { EquipoService } from '../services/equipo.service';

export const equipoRouter = Router();

// Ruta para CREAR un equipo nuevo
equipoRouter.post('/', async (req, res) => {
  try {
    const { nombre, tipo, estado } = req.body;
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

// Ruta para VER qué equipos necesitan mantenimiento urgente
equipoRouter.get('/alertas/mantenimiento', async (req, res) => {
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
});