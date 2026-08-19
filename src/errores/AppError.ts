// ============================================
// APP ERROR — Error del dominio con código HTTP asociado
// El nombre "AppError" se mantiene en inglés: es el contrato exacto que
// exige la especificación (se referencia como "instanceof AppError" en el
// manejador global de errores).
// ============================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, mensaje: string) {
    super(mensaje);
    this.statusCode = statusCode;
    // true = error esperado del dominio (ej: 404), no un bug del programador
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
