# Semana 3 — API REST con Arquitectura en Capas (Casa Hogar / Adultos Mayores)

API REST en **Express 5 + TypeScript** aplicando arquitectura de 4 capas:
`routes → controllers → services → repositories`, con contratos de
respuesta tipados y paginación.

**Dominio**: Casa hogar / Adultos mayores
**Recurso implementado**: Cuidador

## Estructura

```
src/
├── tipos.ts                              # Cuidador, DTOs, contratos de respuesta
├── repositorios/cuidadores.repositorio.ts # Única capa que toca el store (async)
├── servicios/cuidadores.servicio.ts       # Lógica de negocio + paginación (sin Express)
├── controladores/cuidadores.controlador.ts# Thin controller: extrae -> servicio -> responde
├── rutas/cuidadores.rutas.ts              # Solo mapeo URL -> controlador
├── aplicacion.ts                          # Middlewares + registro de rutas
└── servidor.ts                            # Arranque del servidor
```

## Instalación y ejecución

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # compila a dist/ sin errores TypeScript
```

## Endpoints

| Método | Ruta                      | Éxito | Descripción                          |
|--------|---------------------------|-------|----------------------------------------|
| GET    | `/api/v1/cuidadores`      | 200   | Lista paginada (`?page=1&limit=10`)    |
| GET    | `/api/v1/cuidadores/:id`  | 200/404 | Obtiene un cuidador por id            |
| POST   | `/api/v1/cuidadores`      | 201   | Crea un nuevo cuidador                 |
| PUT    | `/api/v1/cuidadores/:id`  | 200/404 | Actualiza un cuidador                 |
| DELETE | `/api/v1/cuidadores/:id`  | 204/404 | Elimina un cuidador                   |

## Contratos de respuesta

```json
// GET /api/v1/cuidadores?page=1&limit=3 -> 200
{ "data": [ ... ], "total": 6, "page": 1, "limit": 3 }

// GET /api/v1/cuidadores/1 -> 200
{ "data": { "id": 1, "nombreCompleto": "...", ... } }

// GET /api/v1/cuidadores/999 -> 404
{ "error": "Not Found", "message": "Cuidador 999 not found" }
```

## Decisiones de diseño

- Se usa **Cuidador** como recurso (variando frente a Residente de la
  semana 2), con campos `especialidad` y `turno`.
- Los nombres `SingleResponse`, `PaginatedResponse`, `ErrorResponse` y
  `PaginationParams` se mantienen en inglés porque la especificación de la
  semana los define como el "contrato genérico" y pide explícitamente no
  renombrarlos. El resto del código (variables, funciones, comentarios)
  está en español.
- El repositorio retorna siempre copias defensivas (`{ ...objeto }`) para
  que nadie fuera de esa capa pueda mutar el store directamente.
