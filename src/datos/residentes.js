
let listaResidentes = [
  {
    id: 1,
    nombreCompleto: "María Elena Restrepo Gómez",
    fechaNacimiento: "1948-03-12",
    fechaIngreso: "2023-06-01",
    numeroHabitacion: "204",
    nivelMovilidad: "asistido",
    restriccionesAlimentarias: "diabética, sin azúcar",
    contactoEmergencia: "310-555-2211",
  },
  {
    id: 2,
    nombreCompleto: "José Ignacio Cárdenas Ruiz",
    fechaNacimiento: "1952-11-05",
    fechaIngreso: "2022-01-15",
    numeroHabitacion: "108",
    nivelMovilidad: "independiente",
    restriccionesAlimentarias: "ninguna",
    contactoEmergencia: "300-421-7788",
  },
  {
    id: 3,
    nombreCompleto: "Rosa Amalia Bedoya Torres",
    fechaNacimiento: "1945-07-22",
    fechaIngreso: "2021-09-10",
    numeroHabitacion: "301",
    nivelMovilidad: "silla de ruedas",
    restriccionesAlimentarias: "dieta blanda",
    contactoEmergencia: "315-998-4432",
  },
  {
    id: 4,
    nombreCompleto: "Alberto de Jesús Marín Quintero",
    fechaNacimiento: "1950-01-30",
    fechaIngreso: "2024-02-20",
    numeroHabitacion: "112",
    nivelMovilidad: "asistido",
    restriccionesAlimentarias: "hipertenso, baja en sodio",
    contactoEmergencia: "320-664-1290",
  },
  {
    id: 5,
    nombreCompleto: "Lucía Fernanda Ospina Vélez",
    fechaNacimiento: "1955-09-14",
    fechaIngreso: "2023-11-03",
    numeroHabitacion: "205",
    nivelMovilidad: "independiente",
    restriccionesAlimentarias: "ninguna",
    contactoEmergencia: "301-772-5544",
  },
];

// Contador para generar el siguiente id disponible
let siguienteId = 6;

function obtenerSiguienteId() {
  return siguienteId++;
}

module.exports = {
  listaResidentes,
  obtenerSiguienteId,
};
