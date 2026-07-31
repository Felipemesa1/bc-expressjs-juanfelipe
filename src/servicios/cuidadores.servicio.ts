// ============================================
// SERVICIO — Lógica de negocio (paginación, reglas de dominio)
// Nunca importa nada de Express
// ============================================

import * as repositorioCuidadores from "../repositorios/cuidadores.repositorio";
import type {
  Cuidador,
  CrearCuidadorDto,
  ActualizarCuidadorDto,
  PaginationParams,
} from "../tipos";

export async function listarPaginado(
  paginacion: PaginationParams
): Promise<{ datos: Cuidador[]; total: number }> {
  const todos = await repositorioCuidadores.obtenerTodos();

  const inicio = (paginacion.page - 1) * paginacion.limit;
  const fin = inicio + paginacion.limit;

  return {
    datos: todos.slice(inicio, fin),
    total: todos.length,
  };
}

export async function obtenerUno(id: number): Promise<Cuidador | null> {
  return repositorioCuidadores.obtenerPorId(id);
}

export async function crearCuidador(datos: CrearCuidadorDto): Promise<Cuidador> {
  return repositorioCuidadores.crear(datos);
}

export async function actualizarCuidador(
  id: number,
  datos: ActualizarCuidadorDto
): Promise<Cuidador | null> {
  return repositorioCuidadores.actualizar(id, datos);
}

export async function eliminarCuidador(id: number): Promise<boolean> {
  return repositorioCuidadores.eliminar(id);
}
