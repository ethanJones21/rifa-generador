const { request, response } = require("express");
const Boleto = require("../models/boleto.model");

const obtenerTodosLosBoletos = async (req = request, res = response) => {
  try {
    const boletos = await Boleto.find({}).sort({ creadoEn: -1 });
    res.json({
      ok: true,
      msg: "Todos los boletos",
      boletos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ver logs, por favor comunicarse con el administrador",
    });
  }
};

const obtenerSeries = async (req = request, res = response) => {
  try {
    let series = await Boleto.find({}, { serie: 1, _id: 0 }).sort({
      creadoEn: -1,
    });
    series = series.map(({ serie }) => serie);

    res.json({
      ok: true,
      msg: "Todos las series para evitar repetir",
      series,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ver logs, por favor comunicarse con el administrador",
    });
  }
};

const crearBoleto = async (req = request, res = response) => {
  const nuevoBoleto = req.body;
  // const file = req.file.filename;
  try {
    const boleto = new Boleto(nuevoBoleto);
    // boleto.imagePath = `${new Date.getTime()}.${path.extname(file)}`;
    boleto.save();
    res.json({
      ok: true,
      msg: "Se creo una boleto de rifa",
      boleto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ver logs, por favor comunicarse con el administrador",
    });
  }
};

const borrarBoleto = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const boleto = await Boleto.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Se borro este boleto",
      boleto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ver logs, por favor comunicarse con el administrador",
    });
  }
};

module.exports = {
  crearBoleto,
  obtenerTodosLosBoletos,
  obtenerSeries,
  borrarBoleto,
};
