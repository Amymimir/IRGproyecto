const pool = require('../BBDD/db');

class Resena {
  constructor({
    id_reseña, id_usuario, id_plato,
    p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
    p1_texto, p2_texto, p3_texto, p4_texto, p5_texto, promedio_estrellas
  }) {
    this.id_reseña = id_reseña;
    this.id_usuario = id_usuario;
    this.id_plato = id_plato;
    this.p1_satisfaccion = p1_satisfaccion;
    this.p2_satisfaccion = p2_satisfaccion;
    this.p3_satisfaccion = p3_satisfaccion;
    this.p4_satisfaccion = p4_satisfaccion;
    this.p5_satisfaccion = p5_satisfaccion;
    this.p1_texto = p1_texto;
    this.p2_texto = p2_texto;
    this.p3_texto = p3_texto;
    this.p4_texto = p4_texto;
    this.p5_texto = p5_texto;
    this.promedio_estrellas = promedio_estrellas;
  }

  /* Crear reseña */

  static async crear(data) {
    const { id_usuario, id_plato, p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
      p1_texto, p2_texto, p3_texto, p4_texto, p5_texto } = data;

    if (!id_usuario || !id_plato ||
      !p1_satisfaccion || !p2_satisfaccion || !p3_satisfaccion || !p4_satisfaccion || !p5_satisfaccion ||
      !p1_texto || !p2_texto || !p3_texto || !p4_texto || !p5_texto) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const [usuarioExistente] = await pool.execute("SELECT * FROM Usuario WHERE id_usuario = ?", [id_usuario]);
    if (usuarioExistente.length === 0) throw new Error("El usuario no existe.");

    const [platoExistente] = await pool.execute("SELECT * FROM Plato WHERE id_plato = ?", [id_plato]);
    if (platoExistente.length === 0) throw new Error("El plato no existe.");

    const total = p1_satisfaccion + p2_satisfaccion + p3_satisfaccion + p4_satisfaccion + p5_satisfaccion;
    const promedio = parseFloat((total / 5).toFixed(2));

    const query = `
      INSERT INTO Resena (
        id_usuario, id_plato,
        p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
        p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
        promedio_estrellas
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id_usuario, id_plato,
      p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
      p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
      promedio
    ];

    const [resultado] = await pool.execute(query, values);
    return new Resena({ id_reseña: resultado.insertId, ...data, promedio_estrellas: promedio });
  }

  /* Obtener todas las reseñas */

  static async obtenerTodas() {
    const [rows] = await pool.query('SELECT * FROM Resena');
    return rows.map(row => new Resena(row));
  }

  /* Obtener mejores reseñas */

  static async obtenerMejoresResenas() {
    const query = `SELECT * FROM Resena ORDER BY promedio_estrellas DESC LIMIT 5`;
    const [rows] = await pool.query(query);
    return rows.map(row => new Resena(row));
  }

  /* Obtener reseña por ID */
  static async obtenerPorId(id_reseña) {
    const [rows] = await pool.execute('SELECT * FROM Resena WHERE id_reseña = ?', [id_reseña]);
    if (rows.length === 0) return null;
    return new Resena(rows[0]);
  }
}

module.exports = Resena;