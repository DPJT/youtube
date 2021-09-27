function obtenerFechaActual() {
  const añoActualUTC = new Date().getUTCFullYear();
  const mesActualUTC = new Date().getUTCMonth() + 1;
  const diaActualUTC = new Date().getUTCDate();
  const horaActualUTC = new Date().getUTCHours();
  const minutoActualUTC = new Date().getUTCMinutes();
  const segundoActualUTC = new Date().getUTCSeconds();
  const UTCdate = new Date().setUTCDate();
  //fechaUtc
  //("2015-03-25T12:00:00-06:30");
  const fechaUTC = `${añoActualUTC}-${
    mesActualUTC < 10 ? 0 + mesActualUTC.toString() : mesActualUTC
  }-${diaActualUTC < 10 ? 0 + diaActualUTC.toString() : diaActualUTC}T${
    horaActualUTC < 10 ? 0 + horaActualUTC.toString() : horaActualUTC
  }:${
    minutoActualUTC < 10 ? 0 + minutoActualUTC.toString() : minutoActualUTC
  }:${
    segundoActualUTC < 10 ? 0 + segundoActualUTC.toString() : segundoActualUTC
  }Z`;

  return fechaUTC;
}

module.exports = { obtenerFechaActual: obtenerFechaActual };
