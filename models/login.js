import bcrypt from "bcrypt";

import validarUsuario from "../schemas/usuario.js";
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

    static async insertUsuario(nombre, pwd) {
        const usuarioFinal = {
            id: crypto.randomUUID(),
            nombre: nombre,
            pwd: pwd,
            conectado: false
        }

        const estado = validarUsuario(usuarioFinal)

        estado.data.pwd = await bcrypt.hash(pwd, 10)

        if (estado.success) {
            const resultado = await MySQLModel.query(`
                INSERT INTO usuarios (id, nombre, pwd, conectado) VALUES
                (?, ?, ?, ?)`,
                [estado.data.id, estado.data.nombre, estado.data.pwd, estado.data.conectado])
            return [true, resultado]
        } else {
            return [false, estado.error]
        }
    }
}