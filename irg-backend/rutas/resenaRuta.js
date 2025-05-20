const express = require("express");
const router = express.Router();
const resenaControlador = require("../controladores/ControladorResena");

// Ruta para crear una nueva reseña
router.post("/", resenaControlador.crearResena); // POST /resenas

// Ruta para obtener todas las reseñas
router.get("/", resenaControlador.listarResenas); // GET /resenas

module.exports = router;