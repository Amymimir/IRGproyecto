const express = require('express');
const router = express.Router();
const platoControlador = require('../controladores/ControladorPlato');

// Ruta para crear un nuevo plato
router.post('/', platoControlador.registrarPlato);

// Ruta para listar todos los platos
router.get('/', platoControlador.listarPlatos);

// Ruta para eliminar plato por ID
router.delete('/:id', platoControlador.borrarPlato);

module.exports = router;