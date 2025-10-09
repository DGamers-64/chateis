import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { apiv1Router } from "./routers/v1/apiv1.js";
import MiddlewareClass from "./middleware/middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 7500;

app.use(cors())
app.use(express.json());

app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
)

app.use(MiddlewareClass.comprobarGuest)

app.use("/api/v1", apiv1Router)

const distPath = path.join(__dirname, "client", "dist");
app.use(express.static(distPath));

app.get("/", (req, res) => {
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