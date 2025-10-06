import MySQLClass from "./mysql.js"

export default class MensajesClass {
    static async obtenerMensajes(req, res) {
        const sala = req.query.sala || "default"
        const ultimo_timestamp = req.query.ultimo_timestamp || '1970-01-01 00:00:00'
        let resultado = []
        
        resultado = await MySQLClass.query(`
            SELECT * FROM mensajes
            WHERE sala LIKE ? AND mandado_en > ?
            ORDER BY mandado_en ASC`,
            [sala, ultimo_timestamp])

        res.send(resultado)
    }
}