import mysql from "mysql2/promise";

export default class MySQLClass {
    
    /**
     * Query básico a la base de datos
     * @param {string} sql - Comando SQL
     * @returns Filas devueltas por la base de datos
     */
    static async query(sql, parametros = []) {
        const conn = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })

        const [resultado] = await conn.execute(sql, parametros)

        await conn.end()

        return resultado
    }
}