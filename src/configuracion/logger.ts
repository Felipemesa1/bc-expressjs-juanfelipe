// ============================================
// LOGGER — Winston configurado para desarrollo y producción
// ============================================

import winston from "winston";

const entorno = process.env.NODE_ENV || "development";
const esProduccion = entorno === "production";

const formatoDesarrollo = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
  )
);

const formatoProduccion = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const transportes: winston.transport[] = [new winston.transports.Console()];

// Solo en producción se escriben los errores también a un archivo
if (esProduccion) {
  transportes.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  );
}

export const logger = winston.createLogger({
  level: esProduccion ? "warn" : "http",
  format: esProduccion ? formatoProduccion : formatoDesarrollo,
  transports: transportes,
});

// Stream que Morgan usa para enviar sus logs de peticiones HTTP a Winston
export const streamMorgan = {
  write: (mensaje: string): void => {
    logger.http(mensaje.trim());
  },
};
