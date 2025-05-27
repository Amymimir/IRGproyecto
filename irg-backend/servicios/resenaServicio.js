const { crearResenia: crearEnDB, obtenerResenias: obtenerDeDB } = require('../entidades/Resena');
const pool = require('../BBDD/db'); 

// Registrar una nueva reseña
async function crearResenia(data) {
    if (
        !data.id_usuario || !data.id_plato ||
        !data.p1_satisfaccion || !data.p2_satisfaccion || !data.p3_satisfaccion ||
        !data.p4_satisfaccion || !data.p5_satisfaccion ||
        !data.p1_texto || !data.p2_texto || !data.p3_texto || !data.p4_texto || !data.p5_texto
    ) {
        throw new Error('Todos los campos son requeridos para crear una reseña.');
    }

    try {
        return await crearEnDB(data);
    } catch (error) {
        throw new Error('Error al guardar la reseña: ' + error.message);
    }
}

// Obtener todas las reseñas
async function obtenerResenias() {
    try {
        return await obtenerDeDB();
    } catch (error) {
        throw new Error('Error al obtener reseñas: ' + error.message);
    }
}

async function obtenerMejoresResenas() {
    try {
        const query = "SELECT * FROM Resena ORDER BY promedio_estrellas DESC LIMIT 5";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener el ranking de reseñas: " + error.message);
    }
}

module.exports = {
    crearResenia,
    obtenerResenias,
    obtenerMejoresResenas
};