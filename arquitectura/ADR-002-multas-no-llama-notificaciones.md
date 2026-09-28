# ADR-002 · El cobro avisa por evento, no llamando al correo
Fecha: 1 de septiembre de 2026 · Estado: aceptada

## Contexto
Cuando se confirma un préstamo hay que cobrar la caución y avisarle al cliente.
Hoy el aviso es un correo, pero la biblioteca ya pidió sumar WhatsApp y una
notificación en la app. Los servicios de correo se caen con frecuencia, y si
`multas` llamara directamente a `notificaciones`, esa caída arrastraría al cobro.

## Driver que manda
Si el correo se cae, el cobro de la caución no se puede caer.

## Decisión
`multas` **no puede importar** a `notificaciones` (regla **R2**). Cuando el cobro
se confirma, `multas` publica el evento `deposito.confirmado` en el bus del `nucleo`
y quien quiera enterarse se suscribe (patrón Observer, Clase 4).

Dos piezas más sostienen la decisión:
- **R3:** `nucleo` no puede importar a ningún módulo. El bus vive ahí; si el núcleo
  dependiera de alguien, el desacople se rompería y volverían los ciclos.
- **En ejecución:** el bus aísla cada suscriptor con `try/catch`. Prohibir el import
  no basta: si el correo lanzara un error y este llegara hasta el cobro, el cobro
  se caería igual (se comprobó antes de corregirlo).

Todo se verifica con `node tools/verificar-arquitectura.js` en el pipeline.

## Alternativa descartada
Que `multas` importe `notificaciones` y llame `avisar()` directamente. Es lo más
simple de leer y depurar. Se descartó porque ata la vida del cobro a la del correo
y obliga a editar `multas` cada vez que se agrega un canal nuevo.

## Qué pagamos
- **Se perdió la trazabilidad al leer:** mirando `cobrar()` ya no se ve qué pasa
  después. Para saber quién reacciona hay que buscar los suscriptores. Depurar cuesta más.
- **Un aviso fallido pasa en silencio:** si el correo falla, el error queda solo en
  la consola, el cliente no se entera y no hay reintento. Cobramos, pero puede no llegar el aviso.
- **Nadie garantiza que alguien escuche:** si ningún módulo se suscribe a
  `deposito.confirmado`, el evento se pierde sin ningún error.
