export default class MiddlewareClass {
    static comprobarGuest(req, res, next) {
        req.guest = false

        if (!req.session.userId) {
            req.guest = true
        }

        next()
    }
}