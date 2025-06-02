const pool = require('../BBDD/db');
const { crearCategoria, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../entidades/Categoria');

// 🟢 Visible para todos
const listarCategoria = async (req, res) => {
  try {
    const categoria = await obtenerCategoria();
    res.status(200).json(categoria);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 🔐 Solo restaurante
const registrarCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;

  if (!nombre_categoria) {
    return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
  }

  try {
    const nuevaCategoria = await crearCategoria(nombre_categoria);
    res.status(201).json({
      mensaje: 'Categoría registrada con éxito',
      ...nuevaCategoria
    });
  } catch (error) {
    console.error('Error al registrar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 🔐 Solo restaurante
const editarCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria } = req.body;

  if (!nombre_categoria) {
    return res.status(400).json({ mensaje: 'Nuevo nombre requerido' });
  }

  try {
    await actualizarCategoria(id_categoria, nombre_categoria);
    res.json({ mensaje: 'Categoría actualizada correctamente' });
  } catch (error) {
    console.error('Error al editar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 🔐 Solo restaurante
const borrarCategoria = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    await eliminarCategoria(id_categoria);
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


module.exports = {
  listarCategoria,
  registrarCategoria,
  editarCategoria,
  borrarCategoria
};