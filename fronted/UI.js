// para manipular el DOM
import BoletoService from "./services/boletoService";
import RuletaService from "./services/ruletaService";
const boletoServ = new BoletoService();
const ruletaServ = new RuletaService();
import { format, register } from "timeago.js";
import domtoimage from "dom-to-image";
import FileSaver from "file-saver";

class UI {
  async obtenerBoletos() {
    this.timeagoCambioIdioma();
    const boletos = await boletoServ.obtenerBoletos();
    const boletosTable = document.querySelector("#boletos-tbody");
    boletosTable.innerHTML = "";
    boletos.map((boleto) => {
      const tr = document.createElement("tr");
      tr.className = "";
      tr.innerHTML = `
                <td class="border px-4 py-2">${boleto.nombre}</td>
                <td class="border px-4 py-2">${boleto.serie}</td>
                <td class="border px-4 py-2 break-all">${boleto.telefono}</td>
                <td class="border px-4 py-2">${boleto.direccion}</td>
                <td class="border px-4 py-2">${format(
                  boleto.creadoEn,
                  "es_ES"
                )}</td>
                <td class="border px-4 py-2 text-red-500"><a class="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full delete" _id="${
                  boleto.id
                }">X</a></td>
        `;
      boletosTable.appendChild(tr);
    });
  }

  async listSeries() {
    await ruletaServ.listSeries();
  }

  spin() {
    ruletaServ.spin();
  }
  drawRouletteWheel() {
    ruletaServ.drawRouletteWheel();
  }

  async borrarBoleto(id) {
    const boleto = await boletoServ.borrarBoleto(id);
    this.obtenerBoletos();
    console.log(boleto);
  }

  async agregarBoleto(boletofd) {
    await boletoServ.crearBoleto(boletofd);
    this.obtenerBoletos();
    this.clearBoletoForm();
  }

  async clearBoletoForm() {
    document.getElementById("boleto-form").reset();
  }

  async convertirAImagen(nombre, telefono, direccion, serie) {
    const template = `
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Ticket Nº${serie}</div>
      <p class="text-gray-700 text-base">
        <strong>Nombre:</strong> ${nombre}
      </p>
      <p class="text-gray-700 text-base">
        <strong>Telefono:</strong> ${telefono}
      </p>
      <p class="text-gray-700 text-base">
        <strong>Dirección:</strong> ${direccion}
      </p>
    </div>
    `;
    const boletaimg = document.getElementById("boleta-img");
    boletaimg.innerHTML = template;
    await domtoimage.toBlob(boletaimg).then(function (blob) {
      FileSaver.saveAs(blob, `${nombre} - Nº${serie}.png`);
    });
  }

  async generarSerie(max, min) {
    const series = await boletoServ.obtenerSeries();
    let serie = Math.floor(Math.random() * (max - min) + min);
    if (series.indexOf(serie) >= 0) serie = serie - 1;
    document.getElementById("serie").value = serie;
  }

  timeagoCambioIdioma() {
    register(
      "es_ES",
      (number, index, total_sec) =>
        [
          ["justo ahora", "ahora mismo"],
          ["hace %s segundos", "en %s segundos"],
          ["hace 1 minuto", "en 1 minuto"],
          ["hace %s minutos", "en %s minutos"],
          ["hace 1 hora", "en 1 hora"],
          ["hace %s horas", "in %s horas"],
          ["hace 1 dia", "en 1 dia"],
          ["hace %s dias", "en %s dias"],
          ["hace 1 semana", "en 1 semana"],
          ["hace %s semanas", "en %s semanas"],
          ["1 mes", "en 1 mes"],
          ["hace %s meses", "en %s meses"],
          ["hace 1 año", "en 1 año"],
          ["hace %s años", "en %s años"],
        ][index]
    );
  }
}

export default UI;
