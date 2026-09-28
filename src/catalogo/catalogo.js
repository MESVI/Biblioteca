// CATALOGO · solo lectura. No importa prestamos, multas ni notificaciones (regla R1).
// Devuelve COPIAS: quien consulta no puede modificar los datos del nucleo.
import { LIBROS, EJEMPLARES, PRESTADOS } from '../nucleo/datos.js';

export function listarLibros() {
  return LIBROS.map(l => Object.assign({}, l));
}

export function ejemplaresDe(idLibro) {
  return EJEMPLARES.map(e => ({
    ejemplar: e,
    disponible: !PRESTADOS.has(idLibro + '|' + e)
  }));
}

export function buscarPorSede(sede) {
  if (!sede) return listarLibros();
  const s = sede.toLowerCase();
  return listarLibros().filter(l => l.sede.toLowerCase().includes(s));
}
