// ============================================
// ESCRITOR — Escribe el reporte en salida/reporte.json
// ============================================

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { Reporte } from "./tipos.js";

export async function escribirReporte(reporte: Reporte): Promise<void> {
  // La especificación exige literalmente la carpeta "output" y el archivo
  // "report.json" (contrato externo, igual que el flag --category)
  const directorioSalida = join(import.meta.dirname, "..", "output");
  const rutaArchivo = join(directorioSalida, "report.json");

  await mkdir(directorioSalida, { recursive: true });
  await writeFile(rutaArchivo, JSON.stringify(reporte, null, 2), "utf-8");

  console.log(`Reporte generado en: ${rutaArchivo}`);
}
