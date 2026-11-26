
# Cafe Origen Analitica

## minireto 1


**dicionario de datos**

| Propiedad | Tipo de dato | significado |
| --- | --- | --- |
| id | integer | identificador de la venta |
| fecha | date | fecha en la que se registro la venta |
| cliente | string | identificador del cliente |
| producto | string | nombre del producto |
| ciudad | string | nombre de la ciudad |
| cantidad | integer | numero de productos |
| precio | integer | valor pagado por el cliente |

**Casos borde detectados**

| # | Problema | Dónde | Riesgo | Decisión |
los problemas identificados son:
- en la columna ciudad, algunos nombre de las ciudades tiene errores ortograficos que pueden afectar el codigo. 
- en la columna cliente, los codigos que identifican a los clinetes esta repetidos


## minireto 2

### Plan en pseudocódigo



Función auxiliar de normalización usada en las comparaciones:

valorVenta(venta)
  RETORNAR venta.cantidad × venta.precio      (si falta un número, usar 0)

totalVendido(ventas)                           patrón ACUMULADOR
  total ← 0
  PARA CADA venta EN ventas
    total ← total + valorVenta(venta)
  RETORNAR total

unidadesVendidas(ventas)                       patrón ACUMULADOR
  unidades ← 0
  PARA CADA venta EN ventas
    unidades ← unidades + venta.cantidad
  RETORNAR unidades

ventaMayor(ventas)                             patrón MÁXIMO
  mayor ← null                                 (todavía no hay candidata)
  PARA CADA venta EN ventas
    SI venta.cantidad <= 0 → pasar a la siguiente
    SI mayor es null O valorVenta(venta) > valorVenta(mayor)
      mayor ← venta                            (se guarda el registro completo)
  RETORNAR mayor

ticketPromedio(ventas)                         ACUMULADOR + CONTADOR
  total ← 0 ; validas ← 0
  PARA CADA venta EN ventas
    SI venta.cantidad > 0
      total ← total + valorVenta(venta)
      validas ← validas + 1
  SI validas = 0 → RETORNAR 0                  (evita 0 / 0 = NaN)
  RETORNAR total / validas

ventasPorCiudad(ventas, ciudad)                ACUMULADOR con condición
  buscada ← normalizar(ciudad)
  SI buscada está vacía → RETORNAR 0
  total ← 0
  PARA CADA venta EN ventas
    SI normalizar(venta.ciudad) = buscada
      total ← total + valorVenta(venta)
  RETORNAR total```

  | Función | Qué recorre | Condición | Qué acumula | Valor inicial |
  |---|---|---|---|---|
  | `totalVendido` | todas las ventas | ninguna | valor de cada venta | `0` |
  | `unidadesVendidas` | todas las ventas | ninguna | cantidad de cada venta | `0` |
  | `ventaMayor` | todas las ventas | cantidad > 0 y valor mayor que el actual | el registro de mayor valor | `null` |
  | `ticketPromedio` | todas las ventas | cantidad > 0 | valor total y número de ventas válidas | `0` y `0` |
  | `ventasPorCiudad` | todas las ventas | ciudad normalizada = ciudad buscada | valor de cada venta que cumple | `0` |

---

### Tabla traza totalVendido(ventas)
| Vuelta | Cantidad | Precio | Valor de venta | Total acumulado |
|---|---:|---:|---:|---:|
| Inicio | — | — | — | 0 |
| 1 | 2 | 15.000 | 30.000 | 30.000 |
| 2 | 3 | 10.000 | 30.000 | 60.000 |
| 3 | 1 | 20.000 | 20.000 | 80.000 |
| 4 | 0 | 12.000 | 0 | 80.000 |

Mediante la tabla de traza de la función `totalVendido(ventas)`, pude observar cómo se calcula el total de las ventas utilizando un ciclo `for...of` y un acumulador.

La variable `total` comienza en cero y, en cada repetición, se suma el resultado de la función `valorVenta(venta)`, que multiplica la cantidad de productos por su precio unitario.

Durante las 12 iteraciones, el acumulador aumenta según el valor de cada venta. En el registro con cantidad igual a cero, el total no cambia, ya que esa venta tiene un valor de $0.

Al finalizar el recorrido, se obtiene un total vendido de **$985.000**.

Este ejercicio me permitió comprender cómo funcionan los acumuladores dentro de un ciclo y cómo podemos utilizar funciones para realizar cálculos sin repetir código.

---

### Tabla traza ventaMyor(ventas)

| Vuelta | ID | Producto | Cantidad | Precio unitario | Valor de venta | ¿Supera a la mayor? | Mayor acumulada |
|---|---|---|---:|---:|---:|---|---:|
| Inicio | — | — | — | — | — | — | `null` |
| 1 | 1 | Origen Huila 500 g | 2 | $42.000 | $84.000 | Sí, es la primera venta | $84.000 (ID 1) |
| 2 | 2 | Origen Nariño 250 g | 1 | $26.000 | $26.000 | No | $84.000 (ID 1) |
| 3 | 3 | Prensa francesa | 1 | $95.000 | $95.000 | Sí | $95.000 (ID 3) |
| 4 | 4 | Origen Huila 500 g | 1 | $42.000 | $42.000 | No | $95.000 (ID 3) |
| 5 | 5 | Origen Sierra 500 g | 3 | $45.000 | $135.000 | Sí | $135.000 (ID 5) |
| 6 | 6 | Origen Nariño 250 g | 2 | $26.000 | $52.000 | No | $135.000 (ID 5) |
| 7 | 7 | Molino manual | 1 | $120.000 | $120.000 | No | $135.000 (ID 5) |
| 8 | 8 | Origen Huila 500 g | 0 | $42.000 | $0 | No | $135.000 (ID 5) |
| 9 | 9 | Origen Sierra 500 g | 2 | $45.000 | $90.000 | No | $135.000 (ID 5) |
| 10 | 10 | Origen Huila 500 g | 4 | $42.000 | $168.000 | **Sí** | **$168.000 (ID 10)** |
| 11 | 11 | Prensa francesa | 1 | $95.000 | $95.000 | No | $168.000 (ID 10) |
| 12 | 12 | Origen Nariño 250 g | 3 | $26.000 | $78.000 | No | **$168.000 (ID 10)** |

Mediante la tabla de traza de la función `ventaMayor(ventas)`, se analizaron los 12 registros del arreglo utilizando un ciclo `for...of` y una condición `if`.

La variable `mayor` comenzó con el valor `null` y se actualizó cada vez que se encontró una venta cuyo valor total era superior al máximo registrado anteriormente.

Durante las 12 iteraciones, la variable `mayor` se actualizó cuatro veces. Finalmente, se identificó que la venta de mayor valor fue la del ID 10, correspondiente al producto «Origen Huila 500 g», con una cantidad de 4 unidades y un precio unitario de $42.000, para un total de $168.000.

Este ejercicio permitió comprender el patrón de máximo, el funcionamiento de los ciclos y la importancia de conservar el objeto completo cuando se necesita recuperar toda la información de una venta.

# Minirreto 4 — Depuración del motor de analítica

## Error 1: ciudades duplicadas

**Síntoma:** Al agrupar las ventas por ciudad sin normalizar los nombres, Bogotá aparecía en dos grupos diferentes.

**Entrada que produce el error:** Dos registros con las ciudades `"Bogotá"` y `"Bogotá "`.

**Hipótesis:** El problema podía estar relacionado con los espacios sobrantes en los nombres de las ciudades, porque JavaScript compara los textos de manera exacta.

**Prueba realizada:** Se creó un arreglo con dos ventas de Bogotá, una con un espacio final, y se ejecutó una agrupación sin normalizar los textos. Después se comparó el resultado con la función `totalPorCiudad()`.

**Causa:** Las cadenas `"Bogotá"` y `"Bogotá "` son diferentes para JavaScript. Por eso, al utilizarlas como claves de un objeto, se generan dos grupos.

**Corrección:** Se utilizaron `trim()` y `toLowerCase()` para normalizar los nombres antes de agrupar. Así, los dos registros corresponden a una misma ciudad.

**Resultado esperado de la verificación:** Un único grupo para Bogotá, con un valor total de $35.000.

## Error 2: ticket promedio con NaN

**Síntoma:** El cálculo del ticket promedio podía devolver `NaN` cuando se consultaba una fecha sin ventas.

**Entrada que produce el error:** Un arreglo vacío `[]`.

**Hipótesis:** El error podía ocurrir porque el programa intentaba dividir el total vendido entre cero.

**Prueba realizada:** Se reprodujo el cálculo `0 / 0` y se comprobó su resultado. Después se probó `ticketPromedio([])` y un arreglo con una venta cuya cantidad era cero.

**Causa:** Al no existir ventas válidas, el total vendido y la cantidad de compras eran cero. Dividir cero entre cero genera `NaN`.

**Corrección:** Se agregó una condición que comprueba si la cantidad de ventas válidas es cero. Cuando se cumple, la función devuelve `0` sin realizar la división.

**Resultado esperado de la verificación:** La función devuelve `0` para un día sin ventas y no produce `NaN`.

## Conclusión

Este ejercicio me permitió comprender la importancia de comprobar los datos antes de realizar operaciones y de normalizar los textos antes de utilizarlos para agrupar información.

También aprendí que la depuración no consiste solamente en corregir un error, sino en identificar qué lo produce, reproducirlo y verificar que la solución funciona correctamente.