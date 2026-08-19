import { Router } from "express";
import * as controladorRegistros from "../controladores/registrosSalud.controlador";

const enrutador = Router();

enrutador.get("/", controladorRegistros.listar);
enrutador.get("/:id", controladorRegistros.obtenerPorId);
enrutador.post("/", controladorRegistros.crear);
enrutador.put("/:id", controladorRegistros.actualizar);
enrutador.delete("/:id", controladorRegistros.eliminar);

export default enrutador;
