
const {ventas} = require('./datos.js').ventas;

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
  let mayor = null;
  for (const venta of ventas) {
    if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}

function ventasValidas(ventas) {
  let validas = 0;
  for(const venta of ventas)
    if (venta.cantidad > 0) {
      validas++;
    }
    return validas;
}

function ticketPromedio(ventas) {
    let total = 0;

    const cantidadValidas = ventasValidas(ventas);

    if (cantidadValidas === 0) {
        return 0;
    }

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total / cantidadValidas;
}

function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
};

function totalVendidoM(ventas) {
    return ventas.reduce((total, valor) => total + valorVenta(ventas), 0);
};

function unidadesVendidasM(ventas) {
    return ventas.reduce(
        (unidades, venta) => unidades + venta.cantidad, 0
    );
}

function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta =>
            venta.ciudad.trim().toLowerCase() === ciudadBuscada
        )
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}

function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {

        const ciudadNormalizada =
            venta.ciudad.trim().toLowerCase();

        const ciudad =
            ciudadNormalizada.charAt(0).toUpperCase() +
            ciudadNormalizada.slice(1);

        if (acumulador[ciudad] === undefined) {
            acumulador[ciudad] = 0;
        }

        acumulador[ciudad] += valorVenta(venta);

        return acumulador;

    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {

        const producto = venta.producto;

        if (acumulador[producto] === undefined) {
            acumulador[producto] = 0;
        }

        acumulador[producto] += venta.cantidad;

        return acumulador;

    }, {});
}

function topProductosPorValor(ventas, k) {

    const totales = ventas.reduce((acumulador, venta) => {

        const producto = venta.producto;

        if (acumulador[producto] === undefined) {
            acumulador[producto] = 0;
        }

        acumulador[producto] += valorVenta(venta);

        return acumulador;

    }, {});

    const productos = Object.entries(totales).map(([producto, total]) => {
        return {
            producto: producto,
            total: total
        };
    });

    const copiaProductos = [...productos];

    copiaProductos.sort((a, b) => b.total - a.total);

    return copiaProductos.slice(0, k);
}



module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ventasValidas,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};


