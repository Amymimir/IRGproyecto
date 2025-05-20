const pool = require('../BBDD/db');

async function crearCategoria(nombre_categoria) {
  const query = 'INSERT INTO categorias (nombre_categoria) VALUES (?)';
  const [resultado] = await pool.execute(query, [nombre_categoria]);

  return {
    id: resultado.insertId,
    nombre_categoria
  };
}

async function obtenerCategorias() {
  const [rows] = await pool.query('SELECT * FROM categorias');
  return rows;
}

async function eliminarCategoria(id_categoria) {
    try {
        const query = "DELETE FROM categorias WHERE id_categoria = ?";
        const [resultado] = await pool.execute(query, [id_categoria]);

        if (resultado.affectedRows === 0) {
            return { success: false, error: "No se encontró una categoría con ese ID." };
        }

        return { success: true, message: "Categoría eliminada con éxito." };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  eliminarCategoria
};
