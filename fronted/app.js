import "./styles/normalize.css";
import "./styles/app.css"; // require("./styles/app.css");
import UI from "./UI";
const ui = new UI();

document
  .getElementById("boletos-tbody")
  .addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete")) {
      await ui.borrarBoleto(e.target.getAttribute("_id"));
    }
  });

document.getElementById("spin").addEventListener("click", () => ui.spin());

document
  .getElementById("generar-serie")
  .addEventListener("click", async () => await ui.generarSerie(3000, 1000));

document.addEventListener("DOMContentLoaded", async () => {
  ui.obtenerBoletos();
  await ui.listSeries();
  ui.drawRouletteWheel();
});

document.getElementById("boleto-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const serie = document.getElementById("serie").value;
  // const image = document.getElementById('image').files[0];
  const fd = new FormData();
  fd.append("nombre", nombre);
  fd.append("telefono", telefono);
  fd.append("direccion", direccion);
  fd.append("serie", serie);
  // fd.append('image',image);
  const ui = new UI();
  ui.agregarBoleto(fd);
  await ui.convertirAImagen(nombre, telefono, direccion, serie);
  // no resetee y no actualize la pagina
});
