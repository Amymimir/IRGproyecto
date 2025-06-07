const { registrarUsuario: registrarEnDB, obtenerUsuarios: obtenerDeDB, eliminarUsuario: eliminarDeDB } = require('../entidades/Usuario');

// Registrar un nuevo usuario
async function registrarUsuario(data) {
    if (!data.nombre || !data.apellidos || !data.telefono || !data.ciudad) {
        throw new Error('Todos los campos son requeridos: nombre, apellidos, telefono y ciudad');
    }

    try {
        return await registrarEnDB(data);
    } catch (error) {
        throw new Error('Error al guardar el usuario: ' + error.message);
    }
}

// Obtener usuarios
async function obtenerUsuarios() {
    try {
        return await obtenerDeDB();
    } catch (error) {
        throw new Error('Error al obtener usuarios: ' + error.message);
    }
}

// Eliminar usuario
async function eliminarUsuario(id_usuario) {
    try {
        if (!id_usuario) {
            throw new Error("Debes proporcionar un ID válido.");
        }

        const resultado = await eliminarDeDB(id_usuario);
        if (!resultado.success) {
            throw new Error("No se encontró un usuario con ese ID.");
        }

        return resultado;
    } catch (error) {
        throw new Error('Error al eliminar usuario: ' + error.message);
    }
}

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    eliminarUsuario
};