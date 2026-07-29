// ============================================
// LECTOR — Lee el archivo de datos JSON
// ============================================

import { readFile } from "fs/promises";
import { join } from "path";
import type { Actividad } from "./tipos.js";

export async function leerActividades(): Promise<Actividad[]> {
  const rutaArchivo = join(
    import.meta.dirname,
    "..",
    "datos",
    "actividades.json"
  );

  try {
    const contenidoCrudo = await readFile(rutaArchivo, "utf-8");
    return JSON.parse(contenidoCrudo) as Actividad[];
  } catch (error) {
    throw new Error(
      `No se pudo leer el archivo de actividades en "${rutaArchivo}": ${
        (error as Error).message
      }`
    );
  }
}
