# Biblioteca Bogotá

Taller **«Rómpelo a propósito»** · **Arquitectura de Software** · Ingeniería de Sistemas · UTadeo

Sistema web mínimo de préstamo de libros. Lo importante no es el código: son las
**fronteras entre módulos**, escritas como decisiones (ADR) y **verificadas solas** por un pipeline.

## Estructura

| Carpeta | Qué hay ahí |
|---|---|
| `src/` | El código, un módulo por responsabilidad (`catalogo`, `prestamos`, `multas`, `notificaciones`, `nucleo`) |
| `arquitectura/` | Los **dos ADR** y `reglas.json` (las decisiones como reglas verificables) |
| `tools/verificar-arquitectura.js` | La función de aptitud que revisa las reglas |
| `.github/workflows/pipeline.yml` | El pipeline: verifica y, si todo está bien, despliega |

## Los dos drivers

| Driver | ADR | Regla |
|---|---|---|
| El catálogo solo consulta, nunca modifica, y debe seguir mostrando libros aunque falle el cobro de la caución. | ADR-001 | **R1** · `catalogo` no importa `prestamos`, `multas` ni `notificaciones` |
| Si el correo se cae, el cobro de la caución no se puede caer. | ADR-002 | **R2** · `multas` no importa `notificaciones` · **R3** · `nucleo` no importa a nadie |

`multas` avisa publicando el evento `deposito.confirmado`; `notificaciones` lo escucha.
El bus (`src/nucleo/eventos.js`) aísla cada suscriptor: si el correo lanza un error, el cobro sigue.

## Cómo se verifica

```
node tools/verificar-arquitectura.js
```

Sale **0** si se respeta y **1** si se viola (o si `reglas.json` está mal escrito). El pipeline
usa ese resultado: si es 1, el despliegue no ocurre.

## Historial esperado: verde · rojo · verde

| # | Qué se hizo | Resultado en Actions |
|---|---|---|
| 1 | Sistema sano | Verde |
| 2 | Se agregó a mano `import ... from '../notificaciones/notificaciones.js'` en `src/multas/multas.js` | **Rojo**, con el mensaje del *porque* de R2 |
| 3 | Se quitó esa línea | Verde |

## Ver la aplicación

Desplegada en GitHub Pages (URL en **Settings → Pages**). También corre abriendo `index.html`
con un servidor local (`npx serve .` o la extensión Live Server): los módulos ES6 no cargan con `file://` en Chrome.

## Si el despliegue falla la primera vez

`Get Pages site failed ... Not Found` → Pages no está encendido. `Settings → Pages → Source: GitHub Actions`
y luego **Re-run all jobs**. Es un fallo de configuración, no de arquitectura: el job *1. Verificar* sale verde.
