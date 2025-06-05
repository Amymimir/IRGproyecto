const Usuario = require('../entidades/Usuario');

const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.registrar(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.obtenerTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los usuarios." });
  }
};

const borrarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const mensaje = await Usuario.eliminar(id_usuario);
    res.status(200).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  borrarUsuario
};