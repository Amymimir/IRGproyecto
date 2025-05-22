const pool = require('../BBDD/db');

async function crearCategoria(nombre_categoria) {
  const query = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';
  const [resultado] = await pool.execute(query, [nombre_categoria]);

  return {
    id: resultado.insertId,
    nombre_categoria
  };
}

async function obtenerCategoria() {
  const [rows] = await pool.query('SELECT * FROM categoria');
  return rows;
}

async function actualizarCategoria(id_categoria, nombre_categoria) {
  const query = 'UPDATE Categoria SET nombre_categoria = ? WHERE id_categoria = ?';
  await pool.execute(query, [nombre_categoria, id_categoria]);
}

async function eliminarCategoria(id_categoria) {
  const query = 'DELETE FROM Categoria WHERE id_categoria = ?';
  await pool.execute(query, [id_categoria]);
}

module.exports = {
  crearCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria
};
