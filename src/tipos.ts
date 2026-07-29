// ============================================
// TIPOS — Dominio: Casa Hogar / Adultos Mayores
// Recurso principal: Actividad
// ============================================

export interface Actividad {
  id: string;
  nombre: string;
  categoria: string; // fisica | cognitiva | social
  costo: number;
  cuposDisponibles: number;
  activa: boolean;
}

// Resumen que el procesador debe calcular
export interface ResumenActividades {
  total: number;
  activas: number;
  inactivas: number;
  costoPromedio: number;
  masCostosa: Actividad;
  masEconomica: Actividad;
  categorias: string[];
}

// Reporte final que se escribe en salida/reporte.json
export interface Reporte {
  generadoEn: string;
  filtroAplicado: string | null;
  resumen: ResumenActividades;
  actividades: Actividad[];
}
