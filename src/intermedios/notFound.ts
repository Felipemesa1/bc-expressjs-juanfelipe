// ============================================
// NOT FOUND — Captura peticiones que no coincidieron con ninguna ruta
// El nombre "notFound" se mantiene (contrato exigido por la especificación)
// ============================================

import type { Request, Response } from "express";
import type { ErrorResponse } from "../tipos";

export function notFound(peticion: Request, respuesta: Response): void {
  const cuerpo: ErrorResponse = {
    error: "Not Found",
    message: `La ruta ${peticion.originalUrl} no existe`,
  };
  respuesta.status(404).json(cuerpo);
}
