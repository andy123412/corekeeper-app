export class Reloj {
  private static fechaFija: Date | null = null;

  // Devuelve la fecha "falsa" si existe, o la real si no
  static ahora(): Date {
    if (this.fechaFija) {
      return new Date(this.fechaFija);
    }
    return new Date();
  }

  // Permite a los tests viajar en el tiempo
  static fijarFecha(fecha: Date): void {
    this.fechaFija = fecha;
  }

  // Devuelve el reloj a la normalidad
  static resetear(): void {
    this.fechaFija = null;
  }
}