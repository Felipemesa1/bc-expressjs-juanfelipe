import express, { type Request, type Response, type NextFunction } from "express";
import rutasCuidadores from "./rutas/cuidadores.rutas";
import type { ErrorResponse } from "./tipos";

const aplicacion = express();

aplicacion.use(express.json());

aplicacion.use((peticion: Request, respuesta: Response, siguiente: NextFunction) => {
  const inicio = Date.now();
  respuesta.on("finish", () => {
    console.log(
      `${peticion.method} ${peticion.originalUrl} ${respuesta.statusCode} - ${
        Date.now() - inicio
      }ms`
    );
  });
  siguiente();
});

aplicacion.get("/", (peticion: Request, respuesta: Response) => {
  respuesta.status(200).json({
    mensaje: "API Casa Hogar - Adultos Mayores funcionando correctamente",
    dominio: "Casa hogar / Adultos mayores",
    recursoPrincipal: "cuidadores",
  });
});

aplicacion.use("/api/v1/cuidadores", rutasCuidadores);

aplicacion.use((peticion: Request, respuesta: Response) => {
  const error: ErrorResponse = {
    error: "Not Found",
    message: `Route ${peticion.originalUrl} not found`,
  };
  respuesta.status(404).json(error);
});

aplicacion.use(
  (error: Error, peticion: Request, respuesta: Response, siguiente: NextFunction) => {
    console.error(error.stack);
    const cuerpoError: ErrorResponse = {
      error: "Internal Server Error",
      message: "Ocurrió un error interno en el servidor",
    };
    respuesta.status(500).json(cuerpoError);
  }
);

export default aplicacion;
