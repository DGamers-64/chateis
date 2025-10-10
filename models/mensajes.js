import validarMensaje from "../schemas/mensajes.js"
import MySQLModel from "./mysql.js"
import crypto from "crypto";

export default class MensajesModel {
    static async getMensajes(sala = "default", ultimo_timestamp = '1970-01-01 00:00:00') {
        let resultado = []

        resultado = await MySQLModel.query(`
            SELECT u.nombre, m.mandado_en, m.mensaje
            FROM mensajes AS m
            JOIN usuarios AS u
            ON m.usuario LIKE u.id
            WHERE sala LIKE ? AND mandado_en > ?
            ORDER BY mandado_en ASC`,
            [sala, ultimo_timestamp])

        return resultado
    }

    static async insertMensajes(usuario, sala, mensaje) {
        let idUsuario = await MySQLModel.query(`
            SELECT id FROM usuarios
            WHERE nombre LIKE ?`,
            [usuario])

        const mensajeFinal = {
            id: crypto.randomUUID(),
            sala: sala,
            usuario: idUsuario[0].id,
            mensaje: mensaje
        }

        const estado = validarMensaje(mensajeFinal)

        if (estado.success) {
            const resultado = await MySQLModel.query(`
                INSERT INTO mensajes (id, sala, usuario, mensaje) VALUES
                (?, ?, ?, ?)`,
                [estado.data.id, estado.data.sala, estado.data.usuario, estado.data.mensaje])
            return [true, resultado]
        } else {
            return [false, estado.error]
        }
    }
}