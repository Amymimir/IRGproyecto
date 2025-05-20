const resenaService = require("../servicios/resenaServicio");

async function crearResena(req, res) {
    try {
        const data = req.body;

        // Validación básica de campos
        if (
            !data.id_usuario || !data.id_plato ||
            !data.p1_satisfaccion || !data.p2_satisfaccion || !data.p3_satisfaccion ||
            !data.p4_satisfaccion || !data.p5_satisfaccion ||
            !data.p1_texto || !data.p2_texto || !data.p3_texto || !data.p4_texto || !data.p5_texto
        ) {
            return res.status(400).json({ success: false, error: "Todos los campos son obligatorios." });
        }

        const nuevaResena = await resenaService.crearResenia(data);
        res.status(201).json({ success: true, data: nuevaResena });

    } catch (error) {
        console.error("Error al crear reseña:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

async function listarResenas(req, res) {
    try {
        const resenas = await resenaService.obtenerResenias();
        res.status(200).json({ success: true, data: resenas });
    } catch (error) {
        console.error("Error al obtener reseñas:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    crearResena,
    listarResenas
};