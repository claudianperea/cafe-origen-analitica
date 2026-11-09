const {ventas} = require("./datos.js");

console.log("Cantidad de registros:", ventas.length);

console.log("Primer registro:", ventas[0]);

console.log("Último registro:", ventas[ventas.length - 1]);

console.log ("producto:", ventas[4].producto);

console.table(ventas);
