const express = require("express");
const router = express.Router();
const resenaControlador = require("../controladores/ControladorResena");

// Ruta para crear una nueva reseña
router.post("/", resenaControlador.crearResena); // POST /resenas

// Ruta para obtener todas las reseñas
router.get("/", resenaControlador.listarResenas); // GET /resenas

// Ruta para obtener las 5 mejores reseñas
router.get("/top5", resenaControlador.listarMejoresResenas);

//Ruta para obtener las reseñas por restaurante
router.get("/porRestaurante", resenaControlador.listarResenasPorRestaurante);

module.exports = router;