const express = require('express');
const usuarioRutas = require('./rutas/usuarioRuta');
const pool = require('./baseDatos/db'); // Este ya es el pool de MySQL

const app = express();
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRutas);

// Verificar conexión al iniciar
async function iniciarServidor() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a MySQL');
    connection.release(); // ¡Importante! Liberar conexión

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
}

iniciarServidor();
