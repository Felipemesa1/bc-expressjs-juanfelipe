import aplicacion from "./aplicacion";
import { logger } from "./configuracion/logger";

const puerto = process.env.PUERTO ? Number(process.env.PUERTO) : 3000;

const servidor = aplicacion.listen(puerto, () => {
  logger.info(`Servidor escuchando en http://localhost:${puerto}`);
});

function apagarConGracia(senal: string): void {
  logger.info(`Señal ${senal} recibida. Cerrando servidor...`);
  servidor.close(() => {
    logger.info("Servidor cerrado correctamente.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => apagarConGracia("SIGTERM"));
process.on("SIGINT", () => apagarConGracia("SIGINT"));
