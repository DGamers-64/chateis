import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.json());

app.use("/api/v1", (req, res) => {
    res.send({ status: "ok" })
})

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

    console.log(styleText("cyan", texto))
})