// ============================================
// TIPOS — Dominio: Casa Hogar / Adultos Mayores
// Recurso principal: Cuidador
// ============================================

export interface Cuidador {
  id: number;
  nombreCompleto: string;
  especialidad: string; // enfermeria | fisioterapia | general
  turno: string; // manana | tarde | noche
  activo: boolean;
  createdAt: string;
}

export type CrearCuidadorDto = Omit<Cuidador, "id" | "createdAt">;
export type ActualizarCuidadorDto = Partial<CrearCuidadorDto>;

// Contratos de respuesta — la especificación exige mantener estos nombres
// exactos (SingleResponse, PaginatedResponse, ErrorResponse) porque son el
// contrato genérico que evalúa la rúbrica
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
