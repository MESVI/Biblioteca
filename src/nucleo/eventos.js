// NUCLEO · bus de eventos. Es el patron Observer de la Clase 4.
// Permite que un modulo anuncie que paso algo SIN conocer a quien escucha.
//
// IMPORTANTE (ADR-002): la regla R2 prohibe el import, pero eso no basta.
// Si un suscriptor (por ejemplo el correo) lanza un error, ese error NO puede
// viajar de vuelta hasta quien publico (el cobro). Por eso cada suscriptor
// se ejecuta aislado: si falla, se registra y los demas siguen.
const suscriptores = {};

export function suscribir(evento, fn) {
  if (!suscriptores[evento]) suscriptores[evento] = [];
  suscriptores[evento].push(fn);
}

export function publicar(evento, datos) {
  (suscriptores[evento] || []).forEach(function (fn) {
    try {
      fn(datos);
    } catch (error) {
      console.error('[eventos] Un suscriptor de "' + evento + '" fallo. ' +
                    'Quien publico NO se ve afectado.', error);
    }
  });
}
