// ============================================
// REPOSITORIO — Única capa que toca el store de datos
// Todos los métodos son async y retornan copias defensivas
// ============================================

import type { Cuidador, CrearCuidadorDto, ActualizarCuidadorDto } from "../tipos";

let listaCuidadores: Cuidador[] = [
  {
    id: 1,
    nombreCompleto: "Ana María Gómez López",
    especialidad: "enfermeria",
    turno: "manana",
    activo: true,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: 2,
    nombreCompleto: "Carlos Andrés Pérez Ruiz",
    especialidad: "fisioterapia",
    turno: "tarde",
    activo: true,
    createdAt: "2023-03-02T00:00:00.000Z",
  },
  {
    id: 3,
    nombreCompleto: "Diana Patricia Salazar",
    especialidad: "general",
    turno: "noche",
    activo: true,
    createdAt: "2023-05-20T00:00:00.000Z",
  },
  {
    id: 4,
    nombreCompleto: "Luis Fernando Rojas",
    especialidad: "enfermeria",
    turno: "tarde",
    activo: true,
    createdAt: "2024-02-10T00:00:00.000Z",
  },
  {
    id: 5,
    nombreCompleto: "Marta Cecilia Duque",
    especialidad: "fisioterapia",
    turno: "manana",
    activo: false,
    createdAt: "2022-11-05T00:00:00.000Z",
  },
  {
    id: 6,
    nombreCompleto: "Jorge Iván Castaño",
    especialidad: "general",
    turno: "noche",
    activo: true,
    createdAt: "2024-06-18T00:00:00.000Z",
  },
];

let siguienteId = 7;

export async function obtenerTodos(): Promise<Cuidador[]> {
  return [...listaCuidadores];
}

export async function obtenerPorId(id: number): Promise<Cuidador | null> {
  const cuidador = listaCuidadores.find((c) => c.id === id);
  return cuidador ? { ...cuidador } : null;
}

export async function crear(datos: CrearCuidadorDto): Promise<Cuidador> {
  const nuevoCuidador: Cuidador = {
    id: siguienteId,
    createdAt: new Date().toISOString(),
    ...datos,
  };
  siguienteId += 1;
  listaCuidadores.push(nuevoCuidador);
  return { ...nuevoCuidador };
}

export async function actualizar(
  id: number,
  datos: ActualizarCuidadorDto
): Promise<Cuidador | null> {
  const indice = listaCuidadores.findIndex((c) => c.id === id);
  if (indice === -1) {
    return null;
  }

  listaCuidadores[indice] = { ...listaCuidadores[indice], ...datos };
  return { ...listaCuidadores[indice] };
}

export async function eliminar(id: number): Promise<boolean> {
  const indice = listaCuidadores.findIndex((c) => c.id === id);
  if (indice === -1) {
    return false;
  }

  listaCuidadores.splice(indice, 1);
  return true;
}
