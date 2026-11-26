# ☕ Café Origen — Motor de Analítica v0.1

## Descripción del proyecto

Café Origen es un proyecto desarrollado con JavaScript y Node.js para analizar las ventas de una cafetería.

El sistema permite calcular indicadores de negocio, organizar información por ciudades y productos, identificar los productos que generan mayores ingresos y presentar los resultados mediante un reporte en la consola.

## Objetivo

Desarrollar un motor de analítica que permita consultar información comercial utilizando funciones, ciclos, métodos de arreglos y objetos.

## Tecnologías utilizadas

- JavaScript.
- Node.js.
- Git y GitHub.
- Visual Studio Code.

## Estructura del proyecto

```text
cafe-origen-analitica/
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   └── reporte.js
├── bitacora.md
└── README.md
```

## Funcionalidades

El sistema permite:

1. Calcular el dinero total vendido.
2. Consultar las unidades vendidas.
3. Identificar la venta de mayor valor.
4. Calcular el ticket promedio.
5. Consultar las ventas de una ciudad.
6. Agrupar los ingresos por ciudad.
7. Agrupar las unidades por producto.
8. Identificar los productos que generan mayores ingresos.
9. Filtrar las ventas por fecha.
10. Generar un reporte de negocio desde la consola.

## ¿Cómo ejecutar el proyecto?

### Requisitos

Tener Node.js instalado.

### Instrucciones

Abrir una terminal en la carpeta principal del proyecto.

Para ejecutar las verificaciones:

```bash
node src/verificar.js
```

Para generar el reporte de negocio:

```bash
node src/reporte.js
```

## ¿Qué información muestra el reporte?

El reporte presenta cuatro secciones principales:

- Resumen general: dinero vendido, unidades vendidas y ticket promedio.
- Ventas por ciudad: ingresos generados en cada ciudad.
- Unidades por producto: cantidad de unidades vendidas por producto.
- Top 3 de productos: productos que generaron más dinero.

También presenta el resumen de un día con ventas y otro sin ventas.

## Manejo de errores

El sistema normaliza los nombres de las ciudades para evitar agrupaciones duplicadas por diferencias de mayúsculas o espacios.

Además, controla los casos en los que no existen ventas válidas para evitar resultados como `NaN`.

## Versión

**v0.1 — Primera versión integrada del motor de analítica.**

Esta versión permite consultar los indicadores principales desde la consola.