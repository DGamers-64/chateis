import { Router } from "express";
import MensajesClass from "../../controllers/mensajes.js";

export const apiv1Router = Router({ mergeParams: true })

apiv1Router.get("/mensajes", MensajesClass.obtenerMensajes)
// apiv1Router.post("/mensajes", )

// apiv1Router.get("/salas", )
// apiv1Router.post("/salas", )

// apiv1Router.get("/md", )
// apiv1Router.post("/md", )

// apiv1Router.get("/notificaciones", )
// apiv1Router.post("/notificaciones", )

// apiv1Router.get("/mods", )
// apiv1Router.post("/mods", )

// apiv1Router.get("/todo", )

// apiv1Router.get("/info", )