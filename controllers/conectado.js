import ConectadoModel from "../models/conectado.js"

export default class ConectadoController {
    static async obtenerConectados(req, res) {
        let resultado = await ConectadoModel.obtenerConectados()

        if (resultado.length == 0) resultado = []

        res.send(resultado)
    }

    static async cambiarConectado(req, res) {
        let resultado = await ConectadoModel.cambiarEstado(req.session.user.nombre, !!req.body.conectado)

        res.send(resultado)
    }
}