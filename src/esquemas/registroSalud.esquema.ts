// ============================================
// ESQUEMAS — Validación con Zod
// ============================================

import { z } from "zod";

export const crearRegistroSaludEsquema = z.object({
  residenteId: z.coerce.number().int().positive("residenteId debe ser un entero positivo"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  presionArterial: z
    .string()
    .regex(/^\d{2,3}\/\d{2,3}$/, "Formato esperado: 120/80"),
  frecuenciaCardiaca: z.coerce
    .number()
    .int()
    .positive("La frecuencia cardíaca debe ser un número positivo"),
  medicamentoAdministrado: z.string().optional(),
  observaciones: z.string().optional(),
  cuidadorId: z.coerce.number().int().positive("cuidadorId debe ser un entero positivo"),
});

// .partial() reutiliza el schema de creación, sin duplicar validaciones,
// y hace todos los campos opcionales para el PUT
export const actualizarRegistroSaludEsquema = crearRegistroSaludEsquema.partial();

// Tipos inferidos automáticamente desde el schema (no se escriben a mano)
export type CrearRegistroSaludDto = z.infer<typeof crearRegistroSaludEsquema>;
export type ActualizarRegistroSaludDto = z.infer<typeof actualizarRegistroSaludEsquema>;

// Validación del parámetro :id de la URL
export const idParametroEsquema = z.coerce.number().int().positive();
