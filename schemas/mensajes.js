import z from "zod";

const mensajesSchema = z.object({
    id: z.uuid(),
    sala: z.string().default("default"),
    usuario: z.uuid(),
    mensaje: z.string().max(65535)
})

export default function validarMensaje(mensaje) {
    return mensajesSchema.safeParse(mensaje)
}