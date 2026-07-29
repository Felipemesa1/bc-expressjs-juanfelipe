// Almacén en memoria (store) para el recurso Residente

import type { Residente, CrearResidenteDto } from "./tipos";

let listaResidentes: Residente[] = [
  {
    id: 1,
    nombreCompleto: "María Elena Restrepo Gómez",
    fechaNacimiento: "1948-03-12",
    numeroHabitacion: "204",
    nivelMovilidad: "asistido",
    restriccionesAlimentarias: "diabética, sin azúcar",
    contactoEmergencia: "310-555-2211",
  },
  {
    id: 2,
    nombreCompleto: "José Ignacio Cárdenas Ruiz",
    fechaNacimiento: "1952-11-05",
    numeroHabitacion: "108",
    nivelMovilidad: "independiente",
    restriccionesAlimentarias: "ninguna",
    contactoEmergencia: "300-421-7788",
  },
  {
    id: 3,
    nombreCompleto: "Rosa Amalia Bedoya Torres",
    fechaNacimiento: "1945-07-22",
    numeroHabitacion: "301",
    nivelMovilidad: "silla de ruedas",
    restriccionesAlimentarias: "dieta blanda",
    contactoEmergencia: "315-998-4432",
  },
  {
    id: 4,
    nombreCompleto: "Alberto de Jesús Marín Quintero",
    fechaNacimiento: "1950-01-30",
    numeroHabitacion: "112",
    nivelMovilidad: "asistido",
    restriccionesAlimentarias: "hipertenso, baja en sodio",
    contactoEmergencia: "320-664-1290",
  },
  {
    id: 5,
    nombreCompleto: "Lucía Fernanda Ospina Vélez",
    fechaNacimiento: "1955-09-14",
    numeroHabitacion: "205",
    nivelMovilidad: "independiente",
    restriccionesAlimentarias: "ninguna",
    contactoEmergencia: "301-772-5544",
  },
];

let siguienteId = 6;

export function obtenerTodos(): Residente[] {
  return listaResidentes;
}

export function obtenerPorId(id: number): Residente | undefined {
  return listaResidentes.find((residente) => residente.id === id);
}

export function crear(datos: CrearResidenteDto): Residente {
  const nuevoResidente: Residente = { id: siguienteId, ...datos };
  siguienteId += 1;
  listaResidentes.push(nuevoResidente);
  return nuevoResidente;
}

export function actualizar(
  id: number,
  datos: Partial<CrearResidenteDto>
): Residente | undefined {
  const indice = listaResidentes.findIndex((residente) => residente.id === id);
  if (indice === -1) {
    return undefined;
  }

  listaResidentes[indice] = { ...listaResidentes[indice], ...datos, id };
  return listaResidentes[indice];
}

export function eliminar(id: number): boolean {
  const indice = listaResidentes.findIndex((residente) => residente.id === id);
  if (indice === -1) {
    return false;
  }

  listaResidentes.splice(indice, 1);
  return true;
}
