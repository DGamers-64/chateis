import MySQLModel from "./mysql.js"

export default class ConectadoModel {
    static async obtenerConectados() {
        let resultado = []
        
        resultado = await MySQLModel.query(`
            SELECT COUNT(u.conectado) AS "conectados"
            FROM usuarios AS u
            WHERE u.conectado = TRUE`)

        return resultado
    }

    static async cambiarEstado(usuario, estado) {
        let idUsuario = await MySQLModel.query(`
            SELECT id FROM usuarios
            WHERE nombre LIKE ?`,
            [usuario])

        const resultado = await MySQLModel.query(`
            UPDATE usuarios
            SET conectado = ?
            WHERE id = ?`,
            [estado, idUsuario[0].id])

        return resultado
    }
}