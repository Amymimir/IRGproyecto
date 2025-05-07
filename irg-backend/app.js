//Iniciamos servidor
//Conectamos con base de datos

const express = require('express');
const usuarioRutas = require('./rutas/usuarioRuta');
const conectarDB = require('./baseDatos/db');

const conectarDB = require('./baseDatos/db');
const clienteRoutes = require('./routes/clienteRuta');

const app = express();
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRutas);

// Verificar conexión al iniciar
conectarDB()
  .then(client => {
    console.log('Conectado a PostgreSQL');
    client.release(); // muy importante: liberar cliente al usar Pool

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con PostgreSQL:', err.message);
    process.exit(1); // Detiene el servidor si no hay DB
  });

app.use('/clientes', clienteRuta);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});


