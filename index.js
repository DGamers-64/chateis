import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { apiv1Router } from "./routers/v1/apiv1.js";
import MiddlewareClass from "./middleware/middleware.js";
import LoginController from "./controllers/login.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "client", "dist");

const app = express();
const PORT = process.env.PORT || 7500;

app.use(cors())
app.use(express.json());

app.use(MiddlewareClass.crearSesionMySQL);

app.get("/login", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"))
})

app.post("/api/v1/login", LoginController.comprobarCredenciales)

app.use(MiddlewareClass.requireLogin)

app.use("/api/v1", apiv1Router)

app.use(express.static(distPath));

app.use("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
    const texto = [
        "--------------------------------------------",
        "                   CHATEIS                  ",
        "--------------------------------------------",
        `PUBLICO: ${process.env.PUBLICO}             `,
        `PREFIJO: ${process.env.PREFIJO}             `,
        "--------------------------------------------",
        `Servidor: http://localhost:${PORT}/api/v1   `,
        `Cliente: http://localhost:${PORT}           `,
        "--------------------------------------------",
    ].join("\n")

    console.log(texto)
})