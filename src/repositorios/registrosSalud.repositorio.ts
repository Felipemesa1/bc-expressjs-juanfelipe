// ============================================
// REPOSITORIO — Única capa que toca el store de datos
// ============================================

import type { RegistroSalud } from "../tipos";
import type {
  CrearRegistroSaludDto,
  ActualizarRegistroSaludDto,
} from "../esquemas/registroSalud.esquema";

let listaRegistros: RegistroSalud[] = [
  {
    id: 1,
    residenteId: 1,
    fecha: "2026-08-01",
    presionArterial: "130/85",
    frecuenciaCardiaca: 78,
    medicamentoAdministrado: "Metformina 500mg",
    observaciones: "Buen estado general",
    cuidadorId: 1,
    createdAt: "2026-08-01T08:00:00.000Z",
  },
  {
    id: 2,
    residenteId: 2,
    fecha: "2026-08-01",
    presionArterial: "120/80",
    frecuenciaCardiaca: 72,
    cuidadorId: 2,
    createdAt: "2026-08-01T09:15:00.000Z",
  },
  {
    id: 3,
    residenteId: 3,
    fecha: "2026-08-02",
    presionArterial: "140/90",
    frecuenciaCardiaca: 85,
    medicamentoAdministrado: "Losartán 50mg",
    observaciones: "Presión ligeramente elevada, monitorear",
    cuidadorId: 1,
    createdAt: "2026-08-02T08:30:00.000Z",
  },
  {
    id: 4,
    residenteId: 4,
    fecha: "2026-08-02",
    presionArterial: "125/82",
    frecuenciaCardiaca: 75,
    medicamentoAdministrado: "Losartán 25mg",
    cuidadorId: 4,
    createdAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: 5,
    residenteId: 5,
    fecha: "2026-08-03",
    presionArterial: "118/76",
    frecuenciaCardiaca: 70,
    observaciones: "Sin novedades",
    cuidadorId: 2,
    createdAt: "2026-08-03T08:45:00.000Z",
  },
];

let siguienteId = 6;

export async function obtenerTodos(): Promise<RegistroSalud[]> {
  return [...listaRegistros];
}

export async function obtenerPorId(id: number): Promise<RegistroSalud | null> {
  const registro = listaRegistros.find((r) => r.id === id);
  return registro ? { ...registro } : null;
}

export async function crear(datos: CrearRegistroSaludDto): Promise<RegistroSalud> {
  const nuevoRegistro: RegistroSalud = {
    id: siguienteId,
    createdAt: new Date().toISOString(),
    ...datos,
  };
  siguienteId += 1;
  listaRegistros.push(nuevoRegistro);
  return { ...nuevoRegistro };
}

export async function actualizar(
  id: number,
  datos: ActualizarRegistroSaludDto
): Promise<RegistroSalud | null> {
  const indice = listaRegistros.findIndex((r) => r.id === id);
  if (indice === -1) {
    return null;
  }

  listaRegistros[indice] = { ...listaRegistros[indice], ...datos };
  return { ...listaRegistros[indice] };
}

export async function eliminar(id: number): Promise<boolean> {
  const indice = listaRegistros.findIndex((r) => r.id === id);
  if (indice === -1) {
    return false;
  }

  listaRegistros.splice(indice, 1);
  return true;
}
