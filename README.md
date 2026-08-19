# Semana 4 — Validación, Errores y Logging (Casa Hogar / Adultos Mayores)

API REST en **Express 5 + TypeScript** con validación de datos con **Zod**,
manejo estructurado de errores con `AppError`, y logging profesional con
**Winston + Morgan**.

**Dominio**: Casa hogar / Adultos mayores
**Recurso implementado**: RegistroSalud

## Estructura

```
src/
├── configuracion/logger.ts                    # Winston + stream para Morgan
├── errores/AppError.ts                        # Clase de error del dominio
├── intermedios/
│   ├── notFound.ts                             # 404 para rutas no encontradas
│   └── errorHandler.ts                         # Manejador global (4 parámetros)
├── esquemas/registroSalud.esquema.ts           # Schemas Zod (crear/actualizar)
├── repositorios/registrosSalud.repositorio.ts  # Store en memoria (async)
├── servicios/registrosSalud.servicio.ts        # Lógica de negocio, lanza AppError
├── controladores/registrosSalud.controlador.ts # safeParse + next(err)
├── rutas/registrosSalud.rutas.ts
├── aplicacion.ts
└── servidor.ts
```

## Instalación y ejecución

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Endpoints

| Método | Ruta                            | Éxito | Descripción                        |
|--------|----------------------------------|-------|-------------------------------------|
| GET    | `/api/v1/registros-salud`        | 200   | Lista paginada                     |
| GET    | `/api/v1/registros-salud/:id`    | 200/400/404 | Por id (400 si no es numérico)|
| POST   | `/api/v1/registros-salud`        | 201/400 | Crea, valida con Zod             |
| PUT    | `/api/v1/registros-salud/:id`    | 200/400/404 | Actualiza (campos opcionales) |
| DELETE | `/api/v1/registros-salud/:id`    | 204/400/404 | Elimina                       |

## Ejemplo de body válido (POST)

```json
{
  "residenteId": 1,
  "fecha": "2026-08-10",
  "presionArterial": "120/80",
  "frecuenciaCardiaca": 80,
  "medicamentoAdministrado": "Losartán 50mg",
  "observaciones": "Control de rutina",
  "cuidadorId": 1
}
```

## Decisiones de diseño (nombres que se mantienen en inglés)

Estos son los nombres que la especificación exige literalmente (contrato
técnico), por eso no se tradujeron — todo el resto del código sí está en
español:
- Clase `AppError`
- Middlewares `notFound` y `errorHandler` (este último con exactamente 4
  parámetros: `(error, peticion, respuesta, siguiente)`)
- Contratos `SingleResponse`, `PaginatedResponse`, `ErrorResponse`

## Evidencias para el instructor

Recuerda tomar capturas de Postman/Thunder Client mostrando:
1. `POST` con body inválido → 400 con `issues[]`
2. `GET /:id` con id no numérico → 400
3. `GET /:id` con id inexistente → 404
4. `GET /ruta-inexistente` → 404 en JSON
5. Los logs visibles en la consola (`pnpm dev`)
