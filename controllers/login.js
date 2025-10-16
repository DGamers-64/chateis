import bcrypt from "bcrypt";
import LoginModel from "../models/login.js";

export default class LoginController {
    static async comprobarCredenciales(req, res) {
        const usuario = await LoginModel.obtenerUsuarioPorNombre(req.body.usuario);

        if (!usuario) {
            return res.send({ ok: false, error: "Usuario no encontrado" });
        }

        const coincide = await bcrypt.compare(req.body.password, usuario.pwd);
        if (!coincide) {
            return res.send({ ok: false, error: "Contraseña incorrecta" });
        }

        req.session.user = { id: usuario.id, nombre: usuario.nombre };
        res.send({ ok: true });
    }

    static async registrarUsuario(req, res) {
        let [estado, resultado] = await LoginModel.insertUsuario(req.body.usuario, req.body.password)

        if (estado) {
            res.send(resultado)
        } else {
            res.send({ error: resultado })
        }
    }
}