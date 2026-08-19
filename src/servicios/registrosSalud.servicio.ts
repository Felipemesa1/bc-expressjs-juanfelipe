// ============================================
// SERVICIO — Lógica de negocio + paginación
// Lanza AppError(404, ...) cuando el recurso no existe
// ============================================

import * as repositorioRegistros from "../repositorios/registrosSalud.repositorio";
import { AppError } from "../errores/AppError";
import type { RegistroSalud } from "../tipos";
import type {
  CrearRegistroSaludDto,
  ActualizarRegistroSaludDto,
} from "../esquemas/registroSalud.esquema";

export async function listarPaginado(
  pagina: number,
  limite: number
): Promise<{ datos: RegistroSalud[]; total: number }> {
  const todos = await repositorioRegistros.obtenerTodos();
  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;

  return {
    datos: todos.slice(inicio, fin),
    total: todos.length,
  };
}

export async function obtenerUno(id: number): Promise<RegistroSalud> {
  const registro = await repositorioRegistros.obtenerPorId(id);
  if (!registro) {
    throw new AppError(404, `No se encontró un registro de salud con id ${id}`);
  }
  return registro;
}

export async function crearRegistro(datos: CrearRegistroSaludDto): Promise<RegistroSalud> {
  return repositorioRegistros.crear(datos);
}

export async function actualizarRegistro(
  id: number,
  datos: ActualizarRegistroSaludDto
): Promise<RegistroSalud> {
  const registroActualizado = await repositorioRegistros.actualizar(id, datos);
  if (!registroActualizado) {
    throw new AppError(404, `No se encontró un registro de salud con id ${id}`);
  }
  return registroActualizado;
}

export async function eliminarRegistro(id: number): Promise<void> {
  const eliminado = await repositorioRegistros.eliminar(id);
  if (!eliminado) {
    throw new AppError(404, `No se encontró un registro de salud con id ${id}`);
  }
}
