const pool = require('../BBDD/db');
const generarClaveUnica = require('../servicios/generadorClaves');

class Restaurante {
  constructor({ id_restaurante, nombre, clave_acceso }) {
    this.id_restaurante = id_restaurante;
    this.nombre = nombre;
    this.clave_acceso = clave_acceso;
  }

  /*Registrar restaurante */

  static async crear(nombre) {
    if (!nombre) {
      throw new Error("El nombre del restaurante es obligatorio.");
    }

    const clave_acceso = generarClaveUnica();
    const query = `INSERT INTO Restaurante (nombre, clave_acceso) VALUES (?, ?)`;
    const [resultado] = await pool.execute(query, [nombre, clave_acceso]);

    return new Restaurante({
      id_restaurante: resultado.insertId,
      nombre,
      clave_acceso
    });
  }

  /* Obtener todos los restaurantes */

  static async obtenerTodos() {
    const [rows] = await pool.query('SELECT id_restaurante, nombre, clave_acceso FROM Restaurante');
    return rows.map(row => new Restaurante(row));
  }

  /* Login restaurante */

  static async login(clave_acceso) {
    if (!clave_acceso) {
      throw new Error("La clave de acceso es obligatoria.");
    }

    const [rows] = await pool.query(
      'SELECT id_restaurante, nombre, clave_acceso FROM Restaurante WHERE clave_acceso = ?',
      [clave_acceso]
    );

    if (rows.length === 0) {
      throw new Error("Clave de acceso incorrecta.");
    }

    return new Restaurante(rows[0]);
  }
}

module.exports = Restaurante;