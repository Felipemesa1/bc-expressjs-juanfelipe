# Semana 2 — API REST con Express (Casa Hogar / Adultos Mayores)

API REST con **Express 5 + TypeScript**, CRUD completo en memoria sobre el
recurso **Residente**, con middlewares personalizados y manejo correcto de
códigos HTTP.

**Dominio**: Casa hogar / Adultos mayores
**Recurso implementado**: Residente

## Estructura

```
src/
├── tipos.ts                     # Interfaz Residente + CrearResidenteDto
├── almacen.ts                    # Store en memoria (5 operaciones CRUD)
├── rutas/residentes.rutas.ts     # 5 endpoints CRUD
├── aplicacion.ts                 # Configura Express: middlewares + rutas
└── servidor.ts                   # Punto de entrada, arranca el servidor
```

## Instalación y ejecución

Requiere Node.js 22+ y pnpm.

```bash
pnpm install
pnpm dev      # levanta con recarga automática en http://localhost:3000
pnpm build    # compila a dist/ (tsc)
pnpm start    # corre la versión compilada
```

## Endpoints

| Método | Ruta                       | Descripción                | Status  |
|--------|----------------------------|-----------------------------|---------|
| GET    | `/api/v1/residentes`       | Lista todos los residentes  | 200     |
| GET    | `/api/v1/residentes/:id`   | Obtiene un residente por id | 200/404 |
| POST   | `/api/v1/residentes`       | Crea un nuevo residente     | 201/400 |
| PUT    | `/api/v1/residentes/:id`   | Actualiza un residente      | 200/404 |
| DELETE | `/api/v1/residentes/:id`   | Elimina un residente        | 204/404 |

## Middlewares (en orden)

1. `express.json()` — parseo del body
2. Logger personalizado — registra método, ruta, status y duración
3. Rutas de `/api/v1/residentes`
4. Manejador de 404 para rutas no encontradas
5. Manejador de errores global (4 parámetros, siempre al final)

## Ejemplo de cuerpo para crear un residente (POST)

```json
{
  "nombreCompleto": "Carmen Julia Restrepo",
  "fechaNacimiento": "1949-05-18",
  "numeroHabitacion": "110",
  "nivelMovilidad": "independiente",
  "restriccionesAlimentarias": "ninguna",
  "contactoEmergencia": "312-555-0099"
}
```

## Decisiones de diseño

- Se mantiene **Residente** como recurso (a diferencia de la semana 1, que
  usa Actividad) porque una API CRUD encaja naturalmente con la gestión de
  registros de residentes.
- Validación básica en `POST`: exige `nombreCompleto`, `fechaNacimiento` y
  `numeroHabitacion`.
