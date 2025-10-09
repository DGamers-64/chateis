import ConectadoModel from "../models/conectado.js"

export default class ConectadoController {
    static async obtenerConectados(req, res) {
        let resultado = await ConectadoModel.obtenerConectados()

        if (resultado.length == 0) resultado = []

        res.send(resultado)
    }

    static async nuevoConectado(req, res) {
        let resultado = await ConectadoModel.cambiarEstado(req.body.usuario, true)

        res.send(resultado)
    }

    static async borrarConectado(req, res) {
        let resultado = await ConectadoModel.cambiarEstado(req.body.usuario, false)

        res.send(resultado)
    }
}