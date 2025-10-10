import bcrypt from "bcrypt";
import MySQLModel from "./models/mysql.js";
import crypto from "crypto";

async function instalacion() {
    await crearUsuarioPorDefecto()
}

async function crearUsuarioPorDefecto() {
    const rows = await MySQLModel.query(
        "SELECT COUNT(*) AS total FROM usuarios WHERE nombre = ?",
        ["admin"]
    );

    if (rows[0].total === 0) {
        const hash = await bcrypt.hash(process.env.CONTRASENA_SISTEMA, 10);
        await MySQLModel.query(
            "INSERT INTO usuarios (id, nombre, pwd, conectado) VALUES (?, ?, ?, ?)",
            [crypto.randomUUID(), "SISTEMA", hash, false]
        );

        console.log("- Usuario SISTEMA creado")
    }
}

instalacion()