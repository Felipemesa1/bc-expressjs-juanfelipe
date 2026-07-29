
const { listaResidentes, obtenerSiguienteId } = require("../datos/residentes");

// GET /residentes -> lista todos los residentes
function listarResidentes(peticion, respuesta) {
  respuesta.status(200).json({
    total: listaResidentes.length,
    residentes: listaResidentes,
  });
}

// GET /residentes/:id -> obtiene un residente por su id
function obtenerResidentePorId(peticion, respuesta) {
  const id = Number(peticion.params.id);
  const residenteEncontrado = listaResidentes.find(
    (residente) => residente.id === id
  );

  if (!residenteEncontrado) {
    return respuesta
      .status(404)
      .json({ mensaje: `No se encontró un residente con id ${id}` });
  }

  respuesta.status(200).json(residenteEncontrado);
}

// POST /residentes -> crea un nuevo residente
function crearResidente(peticion, respuesta) {
  const {
    nombreCompleto,
    fechaNacimiento,
    fechaIngreso,
    numeroHabitacion,
    nivelMovilidad,
    restriccionesAlimentarias,
    contactoEmergencia,
  } = peticion.body;

  // Validación básica de campos obligatorios
  if (!nombreCompleto || !fechaNacimiento || !numeroHabitacion) {
    return respuesta.status(400).json({
      mensaje:
        "Los campos nombreCompleto, fechaNacimiento y numeroHabitacion son obligatorios",
    });
  }

  const nuevoResidente = {
    id: obtenerSiguienteId(),
    nombreCompleto,
    fechaNacimiento,
    fechaIngreso: fechaIngreso || new Date().toISOString().split("T")[0],
    numeroHabitacion,
    nivelMovilidad: nivelMovilidad || "independiente",
    restriccionesAlimentarias: restriccionesAlimentarias || "ninguna",
    contactoEmergencia: contactoEmergencia || "sin registrar",
  };

  listaResidentes.push(nuevoResidente);
  respuesta.status(201).json(nuevoResidente);
}

// PUT /residentes/:id -> actualiza un residente existente
function actualizarResidente(peticion, respuesta) {
  const id = Number(peticion.params.id);
  const indice = listaResidentes.findIndex(
    (residente) => residente.id === id
  );

  if (indice === -1) {
    return respuesta
      .status(404)
      .json({ mensaje: `No se encontró un residente con id ${id}` });
  }

  const residenteActualizado = {
    ...listaResidentes[indice],
    ...peticion.body,
    id, // el id nunca se sobreescribe con el body
  };

  listaResidentes[indice] = residenteActualizado;
  respuesta.status(200).json(residenteActualizado);
}

// DELETE /residentes/:id -> elimina un residente
function eliminarResidente(peticion, respuesta) {
  const id = Number(peticion.params.id);
  const indice = listaResidentes.findIndex(
    (residente) => residente.id === id
  );

  if (indice === -1) {
    return respuesta
      .status(404)
      .json({ mensaje: `No se encontró un residente con id ${id}` });
  }

  const [residenteEliminado] = listaResidentes.splice(indice, 1);
  respuesta.status(200).json({
    mensaje: "Residente eliminado correctamente",
    residente: residenteEliminado,
  });
}

module.exports = {
  listarResidentes,
  obtenerResidentePorId,
  crearResidente,
  actualizarResidente,
  eliminarResidente,
};
