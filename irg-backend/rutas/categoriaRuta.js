const express = require('express');
const router = express.Router();
const {
  listarCategoria,
  registrarCategoria,
  editarCategoria,
  borrarCategoria
} = require('../controladores/ControladorCategoria');

// 📖 Ver todas (usuarios y restaurantes)
router.get('/', listarCategoria);

// 🛡 Las siguientes deben usarse solo si el restaurante está autenticado:
router.post('/', registrarCategoria);                    // Crear
router.put('/:id_categoria', editarCategoria);           // Editar
router.delete('/:id_categoria', borrarCategoria);        // Eliminar

module.exports = router;
