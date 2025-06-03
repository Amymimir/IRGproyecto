const Categoria = require('../entidades/Categoria');

const listarCategoria = async (req, res) => {
  try {
    const categorias = await Categoria.obtenerTodas();
    res.status(200).json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const registrarCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;

  if (!nombre_categoria) {
    return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
  }

  try {
    const nuevaCategoria = await Categoria.crear(nombre_categoria);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al registrar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const editarCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria } = req.body;

  if (!nombre_categoria) {
    return res.status(400).json({ mensaje: 'Nuevo nombre requerido' });
  }

  try {
    const categoriaActualizada = await Categoria.actualizar(id_categoria, nombre_categoria);
    res.json(categoriaActualizada);
  } catch (error) {
    console.error('Error al editar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const borrarCategoria = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    const mensaje = await Categoria.eliminar(id_categoria);
    res.json(mensaje);
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
