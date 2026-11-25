const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");

const {ventas} = require('./datos.js');

const ordenOriginal = ventas.map(venta => venta.id);

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    if (resultadoCiclo === resultadoMetodo) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
    }
}

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas por ciudad",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

console.log("Total por ciudad:", totalPorCiudad(ventas));

console.log("Unidades por producto:", unidadesPorProducto(ventas));

console.log("Top 3 productos:", topProductosPorValor(ventas, 3));

const ordenFinal = ventas.map(venta => venta.id);

if (JSON.stringify(ordenOriginal) === JSON.stringify(ordenFinal)) {
    console.log("Orden original: OK");
} else {
    console.log("Orden original: DIFERENTE");
}