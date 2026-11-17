import { Equipo } from '../repositories/equipo.repository';
import { Reloj } from '../utils/reloj';

export class EquipoService {
  
  static requiereService(equipo: Equipo): boolean {
    const ahora = Reloj.ahora();
    const ultimoService = new Date(equipo.ultimo_service);
    
    // Calculamos la diferencia en milisegundos y la pasamos a días
    const diferenciaMilisegundos = ahora.getTime() - ultimoService.getTime();
    const diasPasados = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    return diasPasados > 90;
  }

}