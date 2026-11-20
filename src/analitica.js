
const ventas = require('./datos.js').ventas;

function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += venta.cantidad;
  }
  return total;
}

function ventaMayor(ventas) {
  let mayor = ventas[0];
  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}

function ventasValidas(ventas) {
    return ventas.filter(venta => venta.cantidad > 0);
}

function tiketPromedio(ventas) {
    return totalVendido(ventas) / ventasValidas(ventas).length;
}



function ventasPorCiudad(ventas, ciudad) {
    return ventas.filter(venta => venta.ciudad === ciudad);
}

console.log(ventasPorCiudad(ventas, "Bogotá"));