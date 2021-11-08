const { Router } = require("express");
const router = Router();

const {
  crearBoleto,
  obtenerTodosLosBoletos,
  obtenerSeries,
  borrarBoleto,
} = require("../controllers/boleto.controller");

router.get("/todos", obtenerTodosLosBoletos);
router.get("/series", obtenerSeries);
router.post("/crear", crearBoleto);
router.delete("/:id", borrarBoleto);

module.exports = router;
