// ============================================
// PROCESADOR — Filtra y calcula estadísticas
// ============================================

import type { Actividad, ResumenActividades } from "./tipos.js";

export function filtrarPorCategoria(
  actividades: Actividad[],
  categoriaFiltro: string | null
): Actividad[] {
  if (categoriaFiltro === null) {
    return actividades;
  }

  const actividadesFiltradas = actividades.filter(
    (actividad) =>
      actividad.categoria.toLowerCase() === categoriaFiltro.toLowerCase()
  );

  if (actividadesFiltradas.length === 0) {
    const categoriasDisponibles = Array.from(
      new Set(actividades.map((actividad) => actividad.categoria))
    );
    throw new Error(
      `No existen actividades en la categoría "${categoriaFiltro}". Categorías disponibles: ${categoriasDisponibles.join(
        ", "
      )}`
    );
  }

  return actividadesFiltradas;
}

export function calcularResumen(actividades: Actividad[]): ResumenActividades {
  const total = actividades.length;
  const activas = actividades.filter((actividad) => actividad.activa);
  const inactivas = actividades.filter((actividad) => !actividad.activa);

  const sumaCostos = actividades.reduce(
    (acumulado, actividad) => acumulado + actividad.costo,
    0
  );
  const costoPromedio =
    total > 0 ? Number((sumaCostos / total).toFixed(2)) : 0;

  const actividadesOrdenadasPorCosto = [...actividades].sort(
    (a, b) => b.costo - a.costo
  );
  const masCostosa = actividadesOrdenadasPorCosto[0];
  const masEconomica =
    actividadesOrdenadasPorCosto[actividadesOrdenadasPorCosto.length - 1];

  const categorias = Array.from(
    new Set(actividades.map((actividad) => actividad.categoria))
  );

  return {
    total,
    activas: activas.length,
    inactivas: inactivas.length,
    costoPromedio,
    masCostosa,
    masEconomica,
    categorias,
  };
}
