const Resena = require('../entidades/Resena');

const crearResena = async (req, res) => {
  try {
    const nuevaResena = await Resena.crear(req.body);
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerResenaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resena = await Resena.obtenerPorId(id);
    if (!resena) {
      return res.status(404).json({ error: "Reseña no encontrada." });
    }
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reseña." });
  }
};

const listarResenas = async (req, res) => {
  try {
    const resenas = await Resena.obtenerTodas();
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las reseñas." });
  }
};

const listarMejoresResenas = async (req, res) => {
  try {
    const mejoresResenas = await Resena.obtenerMejoresResenas();
    res.status(200).json(mejoresResenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarResenasPorRestaurante = async (req, res) => {
  try {
    const { restaurante_id } = req.query;

    if (!restaurante_id) {
      return res.status(400).json({ error: "Debe proporcionar un restaurante_id." });
    }

    const resenas = await Resena.obtenerResenasPorRestaurante(restaurante_id);
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearResena,
  listarResenas,
  listarMejoresResenas,
  listarResenasPorRestaurante,
  obtenerResenaPorId
};