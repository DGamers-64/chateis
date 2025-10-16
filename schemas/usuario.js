import z from "zod";

// MEJORAR USUARIO SCHEMA

const usuarioSchema = z.object({
    id: z.uuid(),
    nombre: z.string().default("default"),
    pwd: z.string().min(4).max(16),
    conectado: z.boolean()
})

export default function validarUsuario(usuario) {
    return usuarioSchema.safeParse(usuario)
}