// ============================================
// ERROR HANDLER — Manejador global de errores
// El nombre "errorHandler" se mantiene (contrato exigido) y debe tener
// EXACTAMENTE 4 parámetros para que Express lo reconozca como manejador
// de errores (a diferencia de un middleware normal, de 3 parámetros).
// ============================================

import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errores/AppError";
import { logger } from "../configuracion/logger";
import type { ErrorResponse } from "../tipos";

export function errorHandler(
  error: Error,
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): void {
  // 1. Errores de validación de Zod -> 400 con detalle de cada campo
  if (error instanceof ZodError) {
    respuesta.status(400).json({
      error: "Bad Request",
      message: "Los datos enviados no son válidos",
      issues: error.issues,
    });
    return;
  }

  // 2. Errores de negocio conocidos (ej: recurso no encontrado) -> su propio statusCode
  if (error instanceof AppError) {
    logger.warn(`${error.statusCode} - ${error.message}`);
    const cuerpo: ErrorResponse = {
      error: "Error de la aplicación",
      message: error.message,
    };
    respuesta.status(error.statusCode).json(cuerpo);
    return;
  }

  // 3. Cualquier otro error no esperado -> 500, sin filtrar detalles en producción
  logger.error(error.stack ?? error.message);
  const cuerpo: ErrorResponse = {
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "Ocurrió un error interno en el servidor"
        : error.message,
  };
  respuesta.status(500).json(cuerpo);
}
