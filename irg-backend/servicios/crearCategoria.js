const pool = require('../BBDD/db');
const { crearCategoria, obtenerCategoria } = require('../entidades/Categoria');

async function registrar(nombre_categoria) {
  if (!nombre_categoria) {
    throw new Error('El nombre de la categoría es obligatorio');
  }

  return await crearCategoria(nombre_categoria);
}

async function listar() {
  return await obtenerCategoria();
}

module.exports = {
  registrar,
  listar
};