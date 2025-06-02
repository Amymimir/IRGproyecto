const pool = require('../BBDD/db');

async function registrarUsuario({ nombre, apellidos, telefono, ciudad }) {
  const query = `
    INSERT INTO usuario (nombre, apellidos, telefono, ciudad)
    VALUES (?, ?, ?, ?)
  `;
  const [resultado] = await pool.execute(query, [nombre, apellidos, telefono, ciudad]);

  return {
    id: resultado.insertId,
    nombre,
    apellidos,
    telefono,
    ciudad
  };
}

async function obtenerUsuarios() {
  const [rows] = await pool.query('SELECT * FROM usuario');
  return rows;
}

async function eliminarUsuario(id_usuario) {
    try {
        if (!id_usuario) {
            return { success: false, error: "Debes proporcionar el ID del usuario a eliminar." };
        }

        const query = `DELETE FROM usuario WHERE id_usuario = ?`;
        const [resultado] = await pool.execute(query, [id_usuario]);

        if (resultado.affectedRows === 0) {
            return { success: false, error: "No se encontró un usuario con ese ID." };
        }

        return { success: true, message: "Usuario con ID:"+id_usuario+" eliminado correctamente." };
    } catch (error) {
        console.error("Error al eliminar usuario:", error.message);
        return { success: false, error: "No se pudo eliminar el usuario." };
    }
  }

module.exports = { registrarUsuario, obtenerUsuarios, eliminarUsuario }
 
