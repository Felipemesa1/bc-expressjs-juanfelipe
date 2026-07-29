// ============================================
// ESCRITOR — Escribe el reporte en salida/reporte.json
// ============================================

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { Reporte } from "./tipos.js";

export async function escribirReporte(reporte: Reporte): Promise<void> {
  const directorioSalida = join(import.meta.dirname, "..", "salida");
  const rutaArchivo = join(directorioSalida, "reporte.json");

  await mkdir(directorioSalida, { recursive: true });
  await writeFile(rutaArchivo, JSON.stringify(reporte, null, 2), "utf-8");

  console.log(`Reporte generado en: ${rutaArchivo}`);
}
