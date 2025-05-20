// Valida datos
// Peticiones HTTP
// Guardar, buscar y eliminar datos

const usuarioService = require('../servicios/Registro');

async function crearUsuario(req, res) {
  const { nombre, apellidos, telefono, ciudad } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !apellidos || !telefono || !ciudad) {
    return res.status(400).json({
      error: 'Todos los campos son necesarios: nombre, apellidos, teléfono y ciudad.',
    });
  }

  try {
    const usuario = await usuarioService.registrarUsuario({ nombre, apellidos, telefono, ciudad });
    res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuario = await usuarioService.obtenerUsuarios();
    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Eliminar usuario por ID
async function borrarUsuario(req, res) {
  try {
    const id_usuario = req.params.id;

    if (!id_usuario) {
      return res.status(400).json({ success: false, error: "Debes proporcionar un ID válido." });
    }

    const resultado = await usuarioService.eliminarUsuario(id_usuario);

    if (!resultado.success) {
      return res.status(404).json(resultado); // Error si el usuario no existe
    }

    res.status(200).json(resultado); // Confirmación de eliminación
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  crearUsuario,
  listarUsuarios,
  borrarUsuario
};