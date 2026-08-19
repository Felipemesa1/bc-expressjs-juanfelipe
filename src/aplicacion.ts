import express, { type Request, type Response } from "express";
import morgan from "morgan";
import rutasRegistros from "./rutas/registrosSalud.rutas";
import { notFound } from "./intermedios/notFound";
import { errorHandler } from "./intermedios/errorHandler";
import { streamMorgan } from "./configuracion/logger";

const aplicacion = express();

aplicacion.use(express.json());

// Morgan registra cada petición HTTP y la envía al logger de Winston
aplicacion.use(morgan("dev", { stream: streamMorgan }));

aplicacion.get("/", (peticion: Request, respuesta: Response) => {
  respuesta.status(200).json({
    mensaje: "API Casa Hogar - Adultos Mayores funcionando correctamente",
    dominio: "Casa hogar / Adultos mayores",
    recursoPrincipal: "registros-salud",
  });
});

aplicacion.use("/api/v1/registros-salud", rutasRegistros);

// El orden importa: primero notFound (rutas que no existen)...
aplicacion.use(notFound);
// ...y errorHandler siempre al final (4 parámetros)
aplicacion.use(errorHandler);

export default aplicacion;
