const pool = require('../BBDD/db');

async function crearResenia(data) {
    const {
        id_usuario, id_plato,
        p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
        p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
    } = data;

    // Validación de campos obligatorios
    if (
        !id_usuario || !id_plato ||
        !p1_satisfaccion || !p2_satisfaccion || !p3_satisfaccion || !p4_satisfaccion || !p5_satisfaccion ||
        !p1_texto || !p2_texto || !p3_texto || !p4_texto || !p5_texto
    ) {
        throw new Error("Todos los campos son obligatorios.");
    }

    // Validación de existencia de claves foráneas
    const [usuarioExistente] = await pool.execute("SELECT * FROM Usuario WHERE id_usuario = ?", [id_usuario]);
    if (usuarioExistente.length === 0) throw new Error("El usuario no existe.");

    const [platoExistente] = await pool.execute("SELECT * FROM Plato WHERE id_plato = ?", [id_plato]);
    if (platoExistente.length === 0) throw new Error("El plato no existe.");

    // Cálculo de promedio de estrellas
    const total = p1_satisfaccion + p2_satisfaccion + p3_satisfaccion + p4_satisfaccion + p5_satisfaccion;
    const promedio = parseFloat((total / 5).toFixed(2));

    try {
        // Inserción en la base de datos
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

        return {
            id: resultado.insertId,
            ...data,
            promedio_estrellas: promedio
        };

    } catch (error) {
        console.error("Error al insertar la reseña:", error.message);
        throw new Error("No se pudo insertar la reseña.");
    }
}

async function obtenerResenias() {
    try {
        const [rows] = await pool.query('SELECT * FROM Resena');
        return rows;
    } catch (error) {
        console.error("Error al obtener reseñas:", error.message);
        throw new Error("No se pudieron obtener las reseñas.");
    }
}

module.exports = {
    crearResenia,
    obtenerResenias,
};