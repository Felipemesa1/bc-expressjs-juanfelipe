// ============================================
// TIPOS — Dominio: Casa Hogar / Adultos Mayores
// Recurso principal: RegistroSalud
// ============================================

export interface RegistroSalud {
  id: number;
  residenteId: number;
  fecha: string;
  presionArterial: string;
  frecuenciaCardiaca: number;
  medicamentoAdministrado?: string;
  observaciones?: string;
  cuidadorId: number;
  createdAt: string;
}

// Contratos de respuesta — nombres genéricos exigidos por la especificación
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
