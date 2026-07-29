
const express = require("express");
const enrutador = express.Router();

const {
  listarResidentes,
  obtenerResidentePorId,
  crearResidente,
  actualizarResidente,
  eliminarResidente,
} = require("../controladores/residentes.controlador");

enrutador.get("/", listarResidentes);
enrutador.get("/:id", obtenerResidentePorId);
enrutador.post("/", crearResidente);
enrutador.put("/:id", actualizarResidente);
enrutador.delete("/:id", eliminarResidente);

module.exports = enrutador;
