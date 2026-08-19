// ============================================
// CONTROLADOR — Valida con Zod, llama al servicio, responde
// Todos los try/catch pasan el error a next(err)
// ============================================

import type { Request, Response, NextFunction } from "express";
import * as servicioRegistros from "../servicios/registrosSalud.servicio";
import {
  crearRegistroSaludEsquema,
  actualizarRegistroSaludEsquema,
  idParametroEsquema,
} from "../esquemas/registroSalud.esquema";
import type { SingleResponse, PaginatedResponse, RegistroSalud } from "../tipos";

export async function listar(
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): Promise<void> {
  try {
    const pagina = Number(peticion.query.page) || 1;
    const limite = Number(peticion.query.limit) || 10;

    const { datos, total } = await servicioRegistros.listarPaginado(pagina, limite);

    const cuerpo: PaginatedResponse<RegistroSalud> = {
      data: datos,
      total,
      page: pagina,
      limit: limite,
    };
    respuesta.status(200).json(cuerpo);
  } catch (error) {
    siguiente(error);
  }
}

export async function obtenerPorId(
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): Promise<void> {
  try {
    const resultadoId = idParametroEsquema.safeParse(peticion.params.id);
    if (!resultadoId.success) {
      respuesta.status(400).json({
        error: "Bad Request",
        message: "El id debe ser un número entero positivo",
        issues: resultadoId.error.issues,
      });
      return;
    }

    const registro = await servicioRegistros.obtenerUno(resultadoId.data);
    const cuerpo: SingleResponse<RegistroSalud> = { data: registro };
    respuesta.status(200).json(cuerpo);
  } catch (error) {
    siguiente(error);
  }
}

export async function crear(
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): Promise<void> {
  try {
    const resultado = crearRegistroSaludEsquema.safeParse(peticion.body);
    if (!resultado.success) {
      respuesta.status(400).json({
        error: "Bad Request",
        message: "Los datos enviados no son válidos",
        issues: resultado.error.issues,
      });
      return;
    }

    const nuevoRegistro = await servicioRegistros.crearRegistro(resultado.data);
    const cuerpo: SingleResponse<RegistroSalud> = { data: nuevoRegistro };
    respuesta.status(201).json(cuerpo);
  } catch (error) {
    siguiente(error);
  }
}

export async function actualizar(
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): Promise<void> {
  try {
    const resultadoId = idParametroEsquema.safeParse(peticion.params.id);
    if (!resultadoId.success) {
      respuesta.status(400).json({
        error: "Bad Request",
        message: "El id debe ser un número entero positivo",
        issues: resultadoId.error.issues,
      });
      return;
    }

    const resultadoBody = actualizarRegistroSaludEsquema.safeParse(peticion.body);
    if (!resultadoBody.success) {
      respuesta.status(400).json({
        error: "Bad Request",
        message: "Los datos enviados no son válidos",
        issues: resultadoBody.error.issues,
      });
      return;
    }

    const registroActualizado = await servicioRegistros.actualizarRegistro(
      resultadoId.data,
      resultadoBody.data
    );
    const cuerpo: SingleResponse<RegistroSalud> = { data: registroActualizado };
    respuesta.status(200).json(cuerpo);
  } catch (error) {
    siguiente(error);
  }
}

export async function eliminar(
  peticion: Request,
  respuesta: Response,
  siguiente: NextFunction
): Promise<void> {
  try {
    const resultadoId = idParametroEsquema.safeParse(peticion.params.id);
    if (!resultadoId.success) {
      respuesta.status(400).json({
        error: "Bad Request",
        message: "El id debe ser un número entero positivo",
        issues: resultadoId.error.issues,
      });
      return;
    }

    await servicioRegistros.eliminarRegistro(resultadoId.data);
    respuesta.status(204).send();
  } catch (error) {
    siguiente(error);
  }
}
