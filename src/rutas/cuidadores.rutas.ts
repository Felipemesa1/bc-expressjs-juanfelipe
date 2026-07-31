// ============================================
// RUTAS — Solo mapeo URL -> controlador
// ============================================

import { Router } from "express";
import * as controladorCuidadores from "../controladores/cuidadores.controlador";

const enrutador = Router();

enrutador.get("/", controladorCuidadores.listar);
enrutador.get("/:id", controladorCuidadores.obtenerPorId);
enrutador.post("/", controladorCuidadores.crear);
enrutador.put("/:id", controladorCuidadores.actualizar);
enrutador.delete("/:id", controladorCuidadores.eliminar);

export default enrutador;
