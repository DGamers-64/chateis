import MensajesModel from "../models/mensajes.js"

export default class MensajesController {
    static async obtenerMensajes(req, res) {
        let resultado = await MensajesModel.getMensajes(req.query.sala, req.query.ultimo_timestamp)

        if (resultado.length == 0) resultado = []

        res.send(resultado)
    }

    static async enviarMensaje(req, res) {
        let [estado, resultado] = await MensajesModel.insertMensajes(req.body.usuario, req.body.sala, req.body.mensaje)

        res.send(resultado)
    }
}