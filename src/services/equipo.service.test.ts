import { describe, it, expect, beforeEach } from 'vitest';
import { EquipoService } from './equipo.service';
import { Reloj } from '../utils/reloj';

describe('EquipoService - Lógica de Negocio', () => {
  beforeEach(() => {
    Reloj.resetear(); // Limpiamos el viaje temporal antes de cada test
  });

  it('debe indicar que requiere service si pasaron más de 90 días', () => {
    // 1. Creamos un equipo con un service hecho en Enero
    const equipo = {
      nombre: 'Switch Cisco',
      tipo: 'Redes',
      estado: 'operativo',
      fecha_adquisicion: new Date('2026-01-01T00:00:00Z'),
      ultimo_service: new Date('2026-01-01T00:00:00Z')
    };

    // 2. Viajamos en el tiempo 100 días al futuro (Abril)
    Reloj.fijarFecha(new Date('2026-04-11T00:00:00Z'));
    
    // 3. Le preguntamos al sistema si necesita service
    const necesita = EquipoService.requiereService(equipo);
    
    // 4. Esperamos que diga que SÍ (true)
    expect(necesita).toBe(true);
  });
});