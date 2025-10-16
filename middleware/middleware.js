import session from "express-session";
import pkg from "express-mysql-session";

const MySQLStore = pkg(session);

export default class MiddlewareClass {
    static requireLogin(req, res, next) {
        const publicPaths = ["/login", "/api/v1/login", "/assets", "/favicon.ico", "/register", "/api/v1/register"]

        if (publicPaths.some(p => req.path === p || req.path.startsWith(p + "/"))) {
            return next();
        }

        if (!req.session.user) {
            if (req.path.startsWith("/api")) {
                return res.status(401).json({ error: "No autenticado" });
            }

            return res.redirect("/login");
        }

        next();
    }

    static crearSesionMySQL = session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            clearExpired: true,
            checkExpirationInterval: 15 * 60 * 1000,
            expiration: 6 * 60 * 60 * 1000
        }),
        cookie: {
            maxAge: 6 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }
    });
}