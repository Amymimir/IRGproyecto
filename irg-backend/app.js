const express = require('express');
const cors = require('cors');

const usuarioRutas = require('./rutas/usuarioRuta');
const restauranteRutas = require('./rutas/restauranteRuta');
const categoriaRutas = require('./rutas/categoriaRuta');
const pool = require('./BBDD/db');
const platoRutas = require('./rutas/platoRuta');
const resenaRuta = require("./rutas/resenaRuta");

const app = express();
app.use(express.json());

app.use(cors());

// Rutas
app.use('/usuarios', usuarioRutas);
app.use('/restaurante', restauranteRutas);
app.use('/platos', platoRutas);
app.use('/resenas', resenaRuta);
app.use('/categoria', categoriaRutas);


// Verificar conexión al iniciar
async function iniciarServidor() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a MySQL');
    connection.release();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor iniciado en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

iniciarServidor();