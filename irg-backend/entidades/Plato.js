const pool = require('../BBDD/db');

// Registrar un nuevo plato con validaciones
async function crearPlato({ nombre_plato, tipo, id_categoria, id_restaurante }) {
    try {
        // Validación de datos obligatorios
        if (!nombre_plato || !tipo || !id_categoria || !id_restaurante) {
            return { success: false, error: "Todos los campos son obligatorios" };
        }

        // Validación del tipo de plato
        const tiposPermitidos = ["comida", "bebida"];
        if (!tiposPermitidos.includes(tipo)) {
            return { success: false, error: `El tipo de plato debe ser uno de los siguientes: ${tiposPermitidos.join(", ")}.` };
        }

        // Insertar el plato en la base de datos
        const query = `INSERT INTO plato (nombre_plato, tipo, id_categoria, id_restaurante) VALUES (?, ?, ?, ?)`;
        const [resultado] = await pool.execute(query, [nombre_plato, tipo, id_categoria, id_restaurante]);

        return {
            success: true,
            id_plato: resultado.insertId,
            nombre_plato,
            tipo,
            id_categoria,
            id_restaurante
        };
    } catch (error) {
        console.error("Error al registrar plato:", error.message);
        return { success: false, error: "No se pudo registrar el plato. Compruebe los datos." };
    }
}

// Obtener todos los platos
async function obtenerPlatos() {
    try {
        const [rows] = await pool.query('SELECT * FROM plato');
        return { success: true, data: rows };
    } catch (error) {
        console.error("Error al obtener platos:", error.message);
        return { success: false, error: "No se pudo obtener la lista de platos." };
    }
}

// ELiminar un plato por su ID
async function eliminarPlato(id_plato) {
    try {
        if (!id_plato) {
            return { success: false, error: "Debes proporcionar el ID del plato a eliminar." };
        }

        const query = `DELETE FROM plato WHERE id_plato = ?`;
        const [resultado] = await pool.execute(query, [id_plato]);

        if (resultado.affectedRows === 0) {
            return { success: false, error: "No se encontró un plato con ese ID." };
        }

        return { success: true, message: "Plato eliminado correctamente." };
    } catch (error) {
        console.error("Error al eliminar plato:", error.message);
        return { success: false, error: "No se pudo eliminar el plato." };
    }
}

module.exports = { crearPlato, obtenerPlatos, eliminarPlato };