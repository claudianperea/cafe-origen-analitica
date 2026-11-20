
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
  RETORNAR total
```

| Función | Qué recorre | Condición | Qué acumula | Valor inicial |
|---|---|---|---|---|
| `totalVendido` | todas las ventas | ninguna | valor de cada venta | `0` |
| `unidadesVendidas` | todas las ventas | ninguna | cantidad de cada venta | `0` |
| `ventaMayor` | todas las ventas | cantidad > 0 y valor mayor que el actual | el registro de mayor valor | `null` |
| `ticketPromedio` | todas las ventas | cantidad > 0 | valor total y número de ventas válidas | `0` y `0` |
| `ventasPorCiudad` | todas las ventas | ciudad normalizada = ciudad buscada | valor de cada venta que cumple | `0` |
