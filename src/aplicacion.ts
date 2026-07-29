import express, { type Request, type Response, type NextFunction } from "express";
import rutasResidentes from "./rutas/residentes.rutas";

const aplicacion = express();

// 1. Middleware para leer JSON en el cuerpo de las peticiones
aplicacion.use(express.json());

// 2. Middleware de registro (logger) personalizado: método, url, status y duración
aplicacion.use((peticion: Request, respuesta: Response, siguiente: NextFunction) => {
  const inicio = Date.now();

  respuesta.on("finish", () => {
    const duracionMs = Date.now() - inicio;
    console.log(
      `${peticion.method} ${peticion.originalUrl} ${respuesta.statusCode} - ${duracionMs}ms`
    );
  });

  siguiente();
});

// Ruta de verificación de estado
aplicacion.get("/", (peticion: Request, respuesta: Response) => {
  respuesta.status(200).json({
    mensaje: "API Casa Hogar - Adultos Mayores funcionando correctamente",
    dominio: "Casa hogar / Adultos mayores",
    recursoPrincipal: "residentes",
  });
});

// 3. Rutas del recurso residentes, versionadas bajo /api/v1
aplicacion.use("/api/v1/residentes", rutasResidentes);

// 4. Middleware para rutas no encontradas (404)
aplicacion.use((peticion: Request, respuesta: Response) => {
  respuesta.status(404).json({ mensaje: "Ruta no encontrada" });
});

// 5. Middleware de manejo de errores global (4 parámetros, siempre al final)
aplicacion.use(
  (error: Error, peticion: Request, respuesta: Response, siguiente: NextFunction) => {
    console.error(error.stack);
    respuesta.status(500).json({ mensaje: "Error interno del servidor" });
  }
);

export default aplicacion;
