// ============================================
// PRINCIPAL — Orquesta todo el flujo
// ============================================

import { leerActividades } from "./lector.js";
import { filtrarPorCategoria, calcularResumen } from "./procesador.js";
import { escribirReporte } from "./escritor.js";
import type { Reporte } from "./tipos.js";

// La especificación de la semana exige literalmente el argumento "--category"
// (es el contrato externo de la herramienta, por eso queda en inglés aunque
// el resto del código esté en español)
function obtenerFiltroCategoria(): string | null {
  const argumentos = process.argv.slice(2);
  const indiceCategoria = argumentos.indexOf("--category");
  return indiceCategoria !== -1 ? argumentos[indiceCategoria + 1] : null;
}

async function principal(): Promise<void> {
  try {
    const filtroCategoria = obtenerFiltroCategoria();

    const todasLasActividades = await leerActividades();
    const actividadesFiltradas = filtrarPorCategoria(
      todasLasActividades,
      filtroCategoria
    );
    const resumen = calcularResumen(actividadesFiltradas);

    const reporte: Reporte = {
      generadoEn: new Date().toISOString(),
      filtroAplicado: filtroCategoria,
      resumen,
      actividades: actividadesFiltradas,
    };

    console.log("--- Resumen de Actividades - Casa Hogar Adultos Mayores ---");
    console.log(`Total de actividades: ${resumen.total}`);
    console.log(`Activas: ${resumen.activas} | Inactivas: ${resumen.inactivas}`);
    console.log(`Costo promedio: $${resumen.costoPromedio}`);
    console.log(
      `Más costosa: ${resumen.masCostosa.nombre} ($${resumen.masCostosa.costo})`
    );
    console.log(
      `Más económica: ${resumen.masEconomica.nombre} ($${resumen.masEconomica.costo})`
    );
    console.log(`Categorías: ${resumen.categorias.join(", ")}`);

    await escribirReporte(reporte);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

principal();
