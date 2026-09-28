# ADR-001 · El catálogo va separado del resto
Fecha: 1 de septiembre de 2026 · Estado: aceptada

## Contexto
El catálogo (ver los libros y qué ejemplares están libres) es lo que más se usa:
la gente consulta varias veces antes de prestar. Además es **solo lectura**.
El cobro de la caución y los avisos dependen de más piezas, así que es más
probable que fallen. Si el catálogo dependiera de ellos, una falla en el cobro
dejaría a la gente sin poder ni siquiera mirar qué libros hay.

## Driver que manda
El catálogo solo consulta, nunca modifica, y debe seguir mostrando libros aunque falle el cobro de la caución.

## Decisión
El módulo `catalogo` **no puede importar** a `prestamos`, `multas` ni `notificaciones`.
Solo lee datos del `nucleo`, y devuelve copias para que nadie lo use para modificar.
Se verifica con la regla **R1** de `arquitectura/reglas.json`, que el pipeline
revisa en cada cambio.

## Alternativa descartada
Lo obvio era un solo módulo «biblioteca» que consulte, preste y cobre, o que el
catálogo le pregunte a `prestamos` si un ejemplar está libre. Se descartó porque
así una falla en el cobro o en el préstamo se llevaría también la consulta,
que es justo lo que el negocio no quiere perder.

## Qué pagamos
- **La regla de «ejemplar disponible» quedó escrita dos veces:** en `catalogo.ejemplaresDe()`
  y en `prestamos.estaDisponible()`. Si mañana cambia (por ejemplo, con reservas),
  hay que editarla en los dos sitios o se contradicen.
- **Alguien tiene que coordinar:** la interfaz (`index.html`) es quien junta catálogo,
  préstamo y cobro. Esa coordinación no vive en ningún módulo.
- **El catálogo quedó atado a la forma de los datos del núcleo:** si cambia cómo se
  guardan los préstamos, hay que tocar el catálogo aunque «no haya cambiado nada» de él.
