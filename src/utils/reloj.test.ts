import { describe, it, expect, beforeEach } from 'vitest';
import { Reloj } from './reloj';

describe('Utilidad Reloj', () => {
  beforeEach(() => {
    Reloj.resetear();
  });

  it('debe devolver la fecha real si no se fijó ninguna', () => {
    const ahora = Reloj.ahora();
    expect(ahora).toBeInstanceOf(Date);
  });

  it('debe permitir fijar una fecha en el futuro para engañar al sistema', () => {
    const fechaFutura = new Date('2026-12-25T10:00:00Z');
    Reloj.fijarFecha(fechaFutura);

    const ahora = Reloj.ahora();
    expect(ahora.toISOString()).toBe(fechaFutura.toISOString());
  });
});