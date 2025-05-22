const pool = require('../BBDD/db');
const generarClaveUnica = require('../servicios/generadorClaves');

// Registrar restaurante con clave única
const registrarRestaurante = async (req, res) => {
  const { nombre } = req.body; // Añade los datos que quieras guardar
  if (!nombre) {
    return res.status(400).json({ mensaje: 'El nombre del restaurante es obligatorio' });
  }

  try {
    const clave = generarClaveUnica();

    const [resultado] = await pool.query(
      'INSERT INTO Restaurante (nombre, clave_acceso) VALUES (?, ?)',
      [nombre, clave]
    );

    res.status(201).json({
      mensaje: 'Restaurante registrado con éxito',
      id_restaurante: resultado.insertId, // Este es generado automáticamente por MySQL
      nombre,
      clave_acceso: clave
    });
  } catch (error) {
    console.error('Error al registrar restaurante:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Login con clave
const loginRestaurante = async (req, res) => {
  const { clave_acceso } = req.body;

  if (!clave_acceso) {
    return res.status(400).json({ mensaje: 'La clave de acceso es obligatoria' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id_restaurante, nombre, clave_acceso FROM Restaurante WHERE clave_acceso = ?',
      [clave_acceso]
    );

    if (rows.length === 0) {
      return res.status(400).json({ mensaje: 'Clave de acceso incorrecta' });
    }

    const restaurante = rows[0]; 
    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      id_restaurante: restaurante.id_restaurante,
      nombre: restaurante.nombre,
      clave_acceso: restaurante.clave_acceso
    });
  } catch (error) {
    console.error('Error en el login de restaurante:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//Obtener restaurantes
const { obtenerRestaurantes } = require('../entidades/Restaurante');

const obtenerTodosRestaurantes = async (req, res) => {
  try {
    const restaurantes = await obtenerRestaurantes();
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarRestaurante,
  loginRestaurante,
  obtenerTodosRestaurantes
};
