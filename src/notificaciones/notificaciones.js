// NOTIFICACIONES · escucha eventos y avisa. Nadie la llama directamente.
import { suscribir } from '../nucleo/eventos.js';

const bandeja = [];

export function iniciar() {
  suscribir('deposito.confirmado', function (p) {
    bandeja.push('Prestamo confirmado: ' + p.libro + ' (' + p.ejemplar + ')' +
                 ' para ' + p.cliente + '. Referencia ' + p.referencia + '.');
  });
}

export function mensajes() {
  return bandeja;
}
