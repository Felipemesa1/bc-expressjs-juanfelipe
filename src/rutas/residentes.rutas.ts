import { Router, type Request, type Response } from "express";
import * as almacenResidentes from "../almacen";
import type { CrearResidenteDto } from "../tipos";

const enrutador = Router();

// GET /api/v1/residentes
enrutador.get("/", (peticion: Request, respuesta: Response) => {
  respuesta.status(200).json(almacenResidentes.obtenerTodos());
});

// GET /api/v1/residentes/:id
enrutador.get("/:id", (peticion: Request, respuesta: Response) => {
  const id = Number(peticion.params.id);
  const residente = almacenResidentes.obtenerPorId(id);

  if (!residente) {
    respuesta.status(404).json({ mensaje: `No se encontró un residente con id ${id}` });
    return;
  }

  respuesta.status(200).json(residente);
});

// POST /api/v1/residentes
enrutador.post("/", (peticion: Request, respuesta: Response) => {
  const datos = peticion.body as CrearResidenteDto;

  if (!datos.nombreCompleto || !datos.fechaNacimiento || !datos.numeroHabitacion) {
    respuesta.status(400).json({
      mensaje:
        "Los campos nombreCompleto, fechaNacimiento y numeroHabitacion son obligatorios",
    });
    return;
  }

  const nuevoResidente = almacenResidentes.crear(datos);
  respuesta.status(201).json(nuevoResidente);
});

// PUT /api/v1/residentes/:id
enrutador.put("/:id", (peticion: Request, respuesta: Response) => {
  const id = Number(peticion.params.id);
  const residenteActualizado = almacenResidentes.actualizar(id, peticion.body);

  if (!residenteActualizado) {
    respuesta.status(404).json({ mensaje: `No se encontró un residente con id ${id}` });
    return;
  }

  respuesta.status(200).json(residenteActualizado);
});

// DELETE /api/v1/residentes/:id
enrutador.delete("/:id", (peticion: Request, respuesta: Response) => {
  const id = Number(peticion.params.id);
  const eliminado = almacenResidentes.eliminar(id);

  if (!eliminado) {
    respuesta.status(404).json({ mensaje: `No se encontró un residente con id ${id}` });
    return;
  }

  respuesta.status(204).send();
});

export default enrutador;
