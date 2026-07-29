
const express = require("express");
const rutasResidentes = require("./rutas/residentes.rutas");

const aplicacion = express();
const puerto = process.env.PUERTO || 3000;


aplicacion.use(express.json());


aplicacion.get("/", (peticion, respuesta) => {
  respuesta.status(200).json({
    mensaje: "API Casa Hogar - Adultos Mayores funcionando correctamente",
    dominio: "Casa hogar / Adultos mayores",
    recursoPrincipal: "residentes",
  });
});

aplicacion.use("/residentes", rutasResidentes);

aplicacion.use((peticion, respuesta) => {
  respuesta.status(404).json({ mensaje: "Ruta no encontrada" });
});

aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

module.exports = aplicacion;
