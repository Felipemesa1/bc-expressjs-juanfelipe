// ============================================
// CONTROLADOR — Thin controller: extraer -> llamar servicio -> responder
// Sin lógica de negocio
// ============================================

import type { Request, Response } from "express";
import * as servicioCuidadores from "../servicios/cuidadores.servicio";
import type {
  CrearCuidadorDto,
  ActualizarCuidadorDto,
  SingleResponse,
  PaginatedResponse,
  ErrorResponse,
  Cuidador,
} from "../tipos";

export async function listar(peticion: Request, respuesta: Response): Promise<void> {
  const pagina = Number(peticion.query.page) || 1;
  const limite = Number(peticion.query.limit) || 10;

  const { datos, total } = await servicioCuidadores.listarPaginado({
    page: pagina,
    limit: limite,
  });

  const cuerpo: PaginatedResponse<Cuidador> = {
    data: datos,
    total,
    page: pagina,
    limit: limite,
  };
  respuesta.status(200).json(cuerpo);
}

export async function obtenerPorId(peticion: Request, respuesta: Response): Promise<void> {
  const id = Number(peticion.params.id);
  const cuidador = await servicioCuidadores.obtenerUno(id);

  if (!cuidador) {
    const error: ErrorResponse = {
      error: "Not Found",
      message: `Cuidador ${id} not found`,
    };
    respuesta.status(404).json(error);
    return;
  }

  const cuerpo: SingleResponse<Cuidador> = { data: cuidador };
  respuesta.status(200).json(cuerpo);
}

export async function crear(peticion: Request, respuesta: Response): Promise<void> {
  const datos = peticion.body as CrearCuidadorDto;
  const nuevoCuidador = await servicioCuidadores.crearCuidador(datos);

  const cuerpo: SingleResponse<Cuidador> = { data: nuevoCuidador };
  respuesta.status(201).json(cuerpo);
}

export async function actualizar(peticion: Request, respuesta: Response): Promise<void> {
  const id = Number(peticion.params.id);
  const datos = peticion.body as ActualizarCuidadorDto;
  const cuidadorActualizado = await servicioCuidadores.actualizarCuidador(id, datos);

  if (!cuidadorActualizado) {
    const error: ErrorResponse = {
      error: "Not Found",
      message: `Cuidador ${id} not found`,
    };
    respuesta.status(404).json(error);
    return;
  }

  const cuerpo: SingleResponse<Cuidador> = { data: cuidadorActualizado };
  respuesta.status(200).json(cuerpo);
}

export async function eliminar(peticion: Request, respuesta: Response): Promise<void> {
  const id = Number(peticion.params.id);
  const eliminado = await servicioCuidadores.eliminarCuidador(id);

  if (!eliminado) {
    const error: ErrorResponse = {
      error: "Not Found",
      message: `Cuidador ${id} not found`,
    };
    respuesta.status(404).json(error);
    return;
  }

  respuesta.status(204).send();
}
