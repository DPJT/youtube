// var utcDate = "2011-06-29T16:52:48.000Z";
// var utcDate2 = "2021-07-12T23:16:14.612+00:00";
// // ISO-8601 formatted date returned from server
// var localDate = new Date(utcDate2);
// console.log(localDate.toString());
// console.log(localDate.toTimeString());
// console.log(localDate.toLocaleDateString());

function utcToLocal(utcDate) {
  const localDate = new Date(utcDate);
  return localDate.toLocaleDateString();
}

function timeAgo(fecha) {
  let resultado;
  // HORA UTC ACTUAL
  const añoActualUTC = new Date().getUTCFullYear();
  const mesActualUTC = new Date().getUTCMonth() + 1;
  const diaActualUTC = new Date().getUTCDate();
  const horaActualUTC = new Date().getUTCHours();
  const minutoActualUTC = new Date().getUTCMinutes();
  const segundoActualUTC = new Date().getUTCSeconds();

  // Separando la hora
  const separacion1 = fecha.split("T");
  const substringHora = separacion1[1].substring(0, 5);
  console.log(substringHora);

  const añomesdia = separacion1[0].split("-");
  const horames = substringHora.split(":");

  const año = añomesdia[0];
  const mes = añomesdia[1];
  const dia = añomesdia[2];

  const hora = horames[0];
  const minuto = horames[1];

  const restaDeAños = añoActualUTC - año;
  const restaDeMeses = mesActualUTC - mes;
  const restaDeDias = diaActualUTC - dia;
  const restaDeHoras = horaActualUTC - hora;
  const restaDeMinutos = minutoActualUTC - minuto;

  if (restaDeAños != 0) {
    let palabra;
    restaDeAños > 1 ? (palabra = "años") : (palabra = "año");

    resultado = `Hace ${restaDeAños} ${palabra}`;
  } else if (restaDeMeses != 0) {
    let palabra;
    restaDeMeses > 1 ? (palabra = "meses") : (palabra = "mes");

    resultado = `Hace ${restaDeMeses} ${palabra}`;
  } else if (restaDeDias != 0) {
    let palabra;
    restaDeDias > 1 ? (palabra = "días") : (palabra = "día");

    resultado = `Hace ${restaDeDias} ${palabra}`;
  } else if (restaDeHoras != 0) {
    let palabra;
    restaDeHoras > 1 ? (palabra = "horas") : (palabra = "hora");

    resultado = `Hace ${restaDeHoras} ${palabra}`;
  } else if (restaDeMinutos != 0) {
    let palabra;
    restaDeMinutos > 1 ? (palabra = "minutos") : (palabra = "minuto");

    resultado = `Hace ${restaDeMinutos} ${palabra}`;
  } else {
    resultado = `Ahora mismo`;
  }
  return resultado;
}

module.exports = {
  utcToLocal,
  timeAgo,
};
