const express = require('express');
const usuarioRutas = require('./rutas/usuarioRuta');
const restauranteRutas = require('./rutas/restauranteRuta');
const categoriaRutas = require('./rutas/categoriaRuta');
const pool = require('./BBDD/db'); // Este ya es el pool de MySQL
const platoRutas = require('./rutas/platoRuta');
const resenaRuta = require("./rutas/resenaRuta");


const app = express();
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRutas);
app.use('/restaurantes', restauranteRutas);
app.use('/platos', platoRutas);
app.use("/resenas", resenaRuta);
app.use("/categoria", categoriaRutas);


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

app.get('/restaurante', (req, res) => {
  res.send('Aquí están los datos del restaurante');
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

iniciarServidor();

