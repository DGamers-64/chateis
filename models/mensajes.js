import { da } from "zod/locales";
import validarMensaje from "../schemas/mensajes.js"
import MySQLModel from "./mysql.js"
import crypto from "crypto";

export default class MensajesModel {
    static async getMensajes(sala = "default", ultimo_timestamp = '1970-01-01 00:00:00') {
        let resultado = []
        
        resultado = await MySQLModel.query(`
            SELECT * FROM mensajes
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

        console.log(idUsuario)

        const mensajeFinal = {
            id: crypto.randomUUID(),
            sala: sala,
            usuario: usuario,
            mensaje: mensaje
        }

        return validarMensaje(mensajeFinal)
    }
}