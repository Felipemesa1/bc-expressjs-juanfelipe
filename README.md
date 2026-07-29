# Semana 1 — Procesador de Datos con Node.js (Casa Hogar / Adultos Mayores)

Herramienta de línea de comandos (CLI) en **Node.js + TypeScript** que lee
datos de actividades desde un archivo JSON, calcula un resumen, permite
filtrar por categoría, y genera un reporte en disco.

**Dominio**: Casa hogar / Adultos mayores
**Recurso implementado**: Actividad (`nombre`, `categoria`, `costo`,
`cuposDisponibles`, `activa`)

## Estructura

```
src/
├── tipos.ts        # Interfaces: Actividad, ResumenActividades, Reporte
├── lector.ts        # Lee datos/actividades.json con fs/promises
├── procesador.ts     # Filtra por categoría y calcula el resumen
├── escritor.ts        # Escribe salida/reporte.json
└── principal.ts       # Orquesta todo el flujo (punto de entrada)
datos/actividades.json # 12 actividades de ejemplo
```

## Instalación y ejecución

Requiere Node.js 22+ y pnpm.

```bash
pnpm install
pnpm build           # compila sin errores TypeScript (tsc --noEmit)
pnpm dev             # muestra el resumen de todas las actividades
pnpm dev -- --category social   # filtra solo la categoría "social"
```

El reporte generado queda en `salida/reporte.json`.

## Manejo de errores

- Si `datos/actividades.json` no existe o no se puede leer, se muestra un
  error descriptivo y el proceso termina con `process.exit(1)`.
- Si se filtra por una categoría que no existe, se muestra un error listando
  las categorías disponibles (`fisica`, `cognitiva`, `social`).

## Decisiones de diseño

- Se eligió **Actividad** como recurso principal (en vez de Residente) porque
  sus campos encajan naturalmente con el esquema pedido (nombre, categoría,
  costo, cupos disponibles, si está activa).
- El argumento `--category` se dejó en inglés porque es el contrato exacto
  que exige la especificación de la herramienta; todo el resto del código
  (variables, funciones, comentarios) está en español.
