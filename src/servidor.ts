import aplicacion from "./aplicacion";

const puerto = process.env.PUERTO ? Number(process.env.PUERTO) : 3000;

const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

// Apagado gradual (graceful shutdown) ante señales del sistema operativo
function apagarConGracia(senal: string): void {
  console.log(`\nSeñal ${senal} recibida. Cerrando servidor...`);
  servidor.close(() => {
    console.log("Servidor cerrado correctamente.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => apagarConGracia("SIGTERM"));
process.on("SIGINT", () => apagarConGracia("SIGINT"));
