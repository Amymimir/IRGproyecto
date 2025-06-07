const Plato = require('../entidades/Plato');

const registrarPlato = async (req, res) => {
  try {
    const nuevoPlato = await Plato.crear(req.body);
    res.status(201).json(nuevoPlato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarPlatos = async (req, res) => {
  try {
    const platos = await Plato.obtenerTodos();
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener la lista de platos." });
  }
};

const borrarPlato = async (req, res) => {
  try {
    const { id_plato } = req.params;
    const mensaje = await Plato.eliminar(id_plato);
    res.status(200).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrarPlato,
  listarPlatos,
  borrarPlato
};
