const { crearPlato, obtenerPlatos, eliminarPlato } = require('../entidades/Plato');
// Registrar un nuevo plato
async function registrarPlato(req, res) {
    console.log("Datos recibidos en Post", req.body);
    const resultado = await crearPlato(req.body);
    res.status(resultado.success ? 201 : 400).json(resultado);
}

// Listar todos los platos
async function listarPlatos(req, res) {
    const resultado = await obtenerPlatos();
    res.status(resultado.success ? 200 : 500).json(resultado);
}

// Eliminar plato por ID
async function borrarPlato(req, res) {
    try {
        const id_plato = req.params.id;

        if (!id_plato) {
            return res.status(400).json({ success: false, error: "Debes proporcionar un ID válido." });
        }

        const resultado = await eliminarPlato(id_plato);

        if (!resultado.success) {
            return res.status(404).json(resultado); // Error si el plato no existe
        }

        res.status(200).json(resultado); // Confirmación de eliminación
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    registrarPlato,
    listarPlatos,
    borrarPlato 
};