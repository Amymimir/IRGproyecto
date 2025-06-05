const pool = require('../BBDD/db');

class Usuario {
  constructor({ id_usuario, nombre, apellidos, telefono, ciudad }) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.ciudad = ciudad;
  }

  /* Registrar usuario */

  static async registrar({ nombre, apellidos, telefono, ciudad }) {
    if (!nombre || !apellidos || !telefono || !ciudad) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const query = `INSERT INTO usuario (nombre, apellidos, telefono, ciudad) VALUES (?, ?, ?, ?)`;
    const [resultado] = await pool.execute(query, [nombre, apellidos, telefono, ciudad]);

    return new Usuario({
      id_usuario: resultado.insertId,
      nombre,
      apellidos,
      telefono,
      ciudad
    });
  }

  /* Obtener todos los usuarios */

  static async obtenerTodos() {
    const [rows] = await pool.query('SELECT * FROM usuario');
    return rows.map(row => new Usuario(row));
  }

  /* Eliminar usuario por ID */

  static async eliminar(id_usuario) {
    if (!id_usuario) {
      throw new Error("Debes proporcionar el ID del usuario a eliminar.");
    }

    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    const [resultado] = await pool.execute(query, [id_usuario]);

    if (resultado.affectedRows === 0) {
      throw new Error("No se encontró un usuario con ese ID.");
    }

    return { message: `Usuario con ID: ${id_usuario} eliminado correctamente.` };
  }
}

module.exports = Usuario;