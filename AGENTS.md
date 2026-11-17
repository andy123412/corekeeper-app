# Reglas Globales para Agentes IA (CoreKeeper)

1. **Metodología Spec-Driven:** La fuente de la verdad es `docs/spec.md`. Si hay un conflicto, se respeta la spec.
2. **Cero Código Mágico:** No implementes funcionalidades gigantes de una vez. Limitate estrictamente a la Tarea actual marcada en `docs/tasks.md`.
3. **Flujo de Trabajo Obligatorio:**
   * **@tester:** Escribe primero los tests basados en los criterios de aceptación.
   * **@backend / @frontend:** Escribe el código mínimo para que los tests pasen a verde.
   * **@revisor:** Audita el código contra la spec y el plan.
4. **Fechas:** Nunca uses `new Date()` directamente en el código de negocio. Usa siempre el inyector de dependencias del Reloj.