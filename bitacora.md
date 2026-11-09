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

los problemas identificados son:
- en la columna ciudad, algunos nombre de las ciudades tiene errores ortograficos que pueden afectar el codigo. 
- en la columna cliente, los codigos que identifican a los clinetes esta repetidos
