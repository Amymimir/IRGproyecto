const pool = require('../BBDD/db');

class Categoria {
  constructor({ id_categoria, nombre_categoria }) {
    this.id_categoria = id_categoria;
    this.nombre_categoria = nombre_categoria;
  }

  /* Crear una categoría */

  static async crear(nombre_categoria) {
    const query = 'INSERT INTO Categoria (nombre_categoria) VALUES (?)';
    const [resultado] = await pool.execute(query, [nombre_categoria]);
    return new Categoria({
      id_categoria: resultado.insertId,
      nombre_categoria
    });
  }

  /* Obtener todas las categorías */

  static async obtenerTodas() {
    const [rows] = await pool.query('SELECT * FROM Categoria');
    return rows.map(row => new Categoria(row));
  }

  /* Actualizar una categoría */

  static async actualizar(id_categoria, nombre_categoria) {
    const query = 'UPDATE Categoria SET nombre_categoria = ? WHERE id_categoria = ?';
    await pool.execute(query, [nombre_categoria, id_categoria]);
    return new Categoria({ id_categoria, nombre_categoria });
  }

  /* Eliminar una categoría */

  static async eliminar(id_categoria) {
    const query = 'DELETE FROM Categoria WHERE id_categoria = ?';
    await pool.execute(query, [id_categoria]);
    return { message: 'Categoría eliminada' };
  }
}

module.exports = Categoria;
