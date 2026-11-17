import { Router } from 'express';
import { EquipoController } from '../controllers/equipo.controller';

export const equipoRouter = Router();

// Ahora las rutas solo conectan la URL con su función en el Controlador
equipoRouter.post('/', EquipoController.crear);
equipoRouter.get('/', EquipoController.obtenerTodos);
equipoRouter.get('/alertas/mantenimiento', EquipoController.obtenerAlertas);