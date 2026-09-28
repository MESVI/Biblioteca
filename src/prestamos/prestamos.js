// PRESTAMOS · bloquea un ejemplar. El ejemplar es un recurso unico:
// no se puede prestar dos veces (la misma leccion de la silla de un concierto).
import { PRESTADOS, LIBROS } from '../nucleo/datos.js';
import { publicar } from '../nucleo/eventos.js';

export function estaDisponible(idLibro, ejemplar) {
  return !PRESTADOS.has(idLibro + '|' + ejemplar);
}

export function prestar(idLibro, ejemplar, nombreCliente) {
  if (!estaDisponible(idLibro, ejemplar)) {
    return { ok: false, motivo: 'Ese ejemplar ya esta prestado' };
  }
  PRESTADOS.add(idLibro + '|' + ejemplar);
  const libro = LIBROS.find(l => l.id === idLibro);
  const prestamo = {
    idLibro: idLibro, libro: libro.nombre, ejemplar: ejemplar,
    cliente: nombreCliente, valor: libro.deposito
  };
  publicar('prestamo.creado', prestamo);
  return { ok: true, prestamo: prestamo };
}
