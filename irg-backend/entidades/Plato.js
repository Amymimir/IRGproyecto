const pool = require('../BBDD/db');

class Plato {
  constructor({ id_plato, nombre_plato, tipo, id_categoria, id_restaurante }) {
    this.id_plato = id_plato;
    this.nombre_plato = nombre_plato;
    this.tipo = tipo;
    this.id_categoria = id_categoria;
    this.id_restaurante = id_restaurante;
  }

  /* Crear un plato */

  static async crear({ nombre_plato, tipo, id_categoria, id_restaurante }) {
    const tiposPermitidos = ["comida", "bebida"];
    if (!nombre_plato || !tipo || !id_categoria || !id_restaurante) {
      throw new Error("Todos los campos son obligatorios.");
    }
    if (!tiposPermitidos.includes(tipo)) {
      throw new Error(`El tipo de plato debe ser uno de los siguientes: ${tiposPermitidos.join(", ")}.`);
    }

    const query = `INSERT INTO plato (nombre_plato, tipo, id_categoria, id_restaurante) VALUES (?, ?, ?, ?)`;
    const [resultado] = await pool.execute(query, [nombre_plato, tipo, id_categoria, id_restaurante]);

    return new Plato({
      id_plato: resultado.insertId,
      nombre_plato,
      tipo,
      id_categoria,
      id_restaurante
    });
  }

  /* Obtener todos los platos */

  static async obtenerTodos() {
    const [rows] = await pool.query('SELECT * FROM plato');
    return rows.map(row => new Plato(row));
  }

  /* Eliminar plato */

  static async eliminar(id_plato) {
    if (!id_plato) {
      throw new Error("Debes proporcionar el ID del plato a eliminar.");
    }

    const query = `DELETE FROM plato WHERE id_plato = ?`;
    const [resultado] = await pool.execute(query, [id_plato]);

    if (resultado.affectedRows === 0) {
      throw new Error("No se encontró un plato con ese ID.");
    }

    return { message: "Plato eliminado correctamente." };
  }
}

module.exports = Plato;