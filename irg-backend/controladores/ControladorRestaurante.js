const Restaurante = require('../entidades/Restaurante');

const registrarRestaurante = async (req, res) => {
  try {
    const nuevoRestaurante = await Restaurante.crear(req.body.nombre);
    res.status(201).json(nuevoRestaurante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.login(req.body.clave_acceso);
    res.status(200).json(restaurante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerTodosRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.obtenerTodos();
    res.status(200).json(restaurantes);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  registrarRestaurante,
  loginRestaurante,
  obtenerTodosRestaurantes,
};