const Resena = require('../entidades/Resena');

const crearResena = async (req, res) => {
  try {
    const nuevaResena = await Resena.crear(req.body);
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = {
  crearResena,
  listarResenas,
  listarMejoresResenas
};