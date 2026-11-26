const { ventas } = require('./datos');

const {
  claveTexto,
  valorVenta,
  contarVentasValidas,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require('./analitica');

//formatoPesos convierte los numeros en letras para ponerles el formato de la region es-CO, osea en lugar de que salga como 50000, sale como "50.000".//
function formatoPesos(valor) {
    return "$ " + valor.toLocaleString("es-CO", {
        maximumFractionDigits: 0
    });
}

function mostrarTitulo(titulo) {
    console.log("\n" + "=".repeat(40));
    console.log(titulo);
    console.log("=".repeat(40));
}

mostrarTitulo("-----CAFÉ ORIGEN-----");
mostrarTitulo("Resumen General De Ventas");

console.log(`Total vendido: ${formatoPesos(totalVendido(ventas))}`);
console.log(`Unidades vendidas: ${unidadesVendidas(ventas)}`);
console.log(`Ticket promedio: ${formatoPesos(ticketPromedio(ventas))}`);



mostrarTitulo("Ventas Por Ciudad");

const ciudades = totalPorCiudad(ventas);

const tablaCiudades = Object.entries(ciudades).map(([ciudad, total]) => {
    return {
        Ciudad: ciudad,
        "Total vendido": formatoPesos(total)
    };
});

console.table(tablaCiudades); //imprime la tabla de ventas por ciudad//


mostrarTitulo("Unidades Vendidas Por Producto");

const productos = unidadesPorProducto(ventas);

const tablaProductos = Object.entries(productos).map(([producto, unidades]) => {
    return {
        Producto: producto,
        Unidades: unidades
    };
});

console.table(tablaProductos); //imprime la tabla de unidades vendidas de cada producto//


mostrarTitulo("TOP 3 PRODUCTOS POR VALOR");

const top3 = topProductosPorValor(ventas, 3);

const tablaTop3 = top3.map((producto, indice) => {
    return {
        Posicion: indice + 1,
        Producto: producto.producto,
        "Dinero generado": formatoPesos(producto.total)
    };
});

console.table(tablaTop3); //imprime los tres productos mas vendidos//


//Esta función se utiliza para imprimir el resumen de ventas por fechas//
function mostrarResumenDia(fecha) {
    mostrarTitulo(`RESUMEN DEL DÍA: ${fecha}`);

    const ventasDia = ventasDelDia(ventas, fecha);

    if (ventasDia.length === 0) {
        console.log("No se registraron ventas en esta fecha.");
        console.log(`Total vendido: ${formatoPesos(0)}`);
        console.log("Unidades vendidas: 0");
        console.log(`Ticket promedio: ${formatoPesos(0)}`);
        return;
    }

    console.log(`Total vendido: ${formatoPesos(totalVendido(ventasDia))}`);
    console.log(`Unidades vendidas: ${unidadesVendidas(ventasDia)}`);
    console.log(`Ticket promedio: ${formatoPesos(ticketPromedio(ventasDia))}`);
} 

// Día con ventas //
mostrarResumenDia("2026-09-05");

// Día sin ventas //
mostrarResumenDia("2026-09-07");









