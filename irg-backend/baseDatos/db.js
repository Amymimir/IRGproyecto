const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',       // Por defecto: 'root' en XAMPP
  password: 'tu_contraseña',// Deja vacío si no has puesto una
  database: 'registro_usuarios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
