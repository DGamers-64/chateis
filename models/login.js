import MySQLModel from "./mysql.js";

export default class LoginModel {
    static async obtenerUsuarioPorNombre(usuario) {
        const rows = await MySQLModel.query(`
            SELECT id, nombre, pwd
            FROM usuarios
            WHERE nombre = ?
            LIMIT 1
        `, [usuario]);
        return rows[0] || null;
    }
}