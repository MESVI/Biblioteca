// MULTAS · cobra la caucion. NO importa notificaciones (regla R2):
// si el envio de correos falla, el cobro no se puede caer.
// Por eso avisa publicando un evento, no llamando a nadie.
import { publicar } from '../nucleo/eventos.js';
import { mensajes } from '../notificaciones/notificaciones.js';

export function cobrar(prestamo) {
  const referencia = 'DP-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  publicar('deposito.confirmado', Object.assign({}, prestamo, { referencia: referencia }));
  return { ok: true, referencia: referencia, valor: prestamo.valor };
}
