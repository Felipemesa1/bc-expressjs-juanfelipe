// Tipos del dominio: Casa Hogar / Adultos Mayores
// Recurso principal: Residente

export interface Residente {
  id: number;
  nombreCompleto: string;
  fechaNacimiento: string;
  numeroHabitacion: string;
  nivelMovilidad: string;
  restriccionesAlimentarias: string;
  contactoEmergencia: string;
}

export type CrearResidenteDto = Omit<Residente, "id">;
