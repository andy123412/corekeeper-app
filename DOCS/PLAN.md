# Plan de Arquitectura - CoreKeeper

## Arquitectura General
* **Frontend:** React + TypeScript + Tailwind CSS.
* **Backend:** Node.js + Express + TypeScript, estructurado en 3 capas (Controller, Service, Repository).
* **Base de Datos:** PostgreSQL.

## Manejo del Tiempo (Casos Borde)
Para testear las alertas de `Service Vencido` (RN-03 y RN-04), se implementará un `Reloj` inyectable en el Backend. Esto permitirá fijar y adelantar la fecha en los tests sin depender del reloj real del sistema operativo.

## Distribución de Reglas de Negocio
Las reglas de validación (Unicidad de ID, Transiciones de Estado, Coherencia de Fechas) vivirán exclusivamente en la capa **Service** del backend.

## Endpoints Principales
* `GET /api/equipos` -> Lista el inventario.
* `POST /api/equipos` -> Registra un nuevo equipo.
* `PATCH /api/equipos/:id/estado` -> Cambia el estado operativo.
* `POST /api/mantenimientos` -> Registra una intervención.