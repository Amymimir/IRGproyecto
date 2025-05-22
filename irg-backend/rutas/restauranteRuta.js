const express = require('express');
const router = express.Router();
const {
  registrarRestaurante,
  loginRestaurante,
  obtenerTodosRestaurantes
} = require('../controladores/ControladorRestaurante');

// Ruta para registrar restaurante
router.post('/registro', registrarRestaurante);

// Ruta para login de restaurante
router.post('/login', loginRestaurante);

//Ruta para obtener restaurante
router.get('/', obtenerTodosRestaurantes);

module.exports = router;
