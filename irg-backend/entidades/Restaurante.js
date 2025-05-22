const pool = require('../BBDD/db');

async function crearRestaurante(nombre, clave_acceso) {
  const query = `
    INSERT INTO restaurantes (nombre, clave_acceso)
    VALUES (?)
  `;
  const [resultado] = await pool.execute(query, [nombre, clave_acceso]);

  return {
    id: resultado.insertId,  // El id_restaurante se genera automáticamente
    nombre,
    clave_acceso
  };
}

async function obtenerRestaurantes() {
  const [rows] = await pool.query('SELECT id_restaurante, nombre, clave_acceso FROM Restaurante');
  return rows;
}

module.exports = {
  crearRestaurante,
  obtenerRestaurantes,
};
