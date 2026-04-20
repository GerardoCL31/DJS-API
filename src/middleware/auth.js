import { verifyAccessToken } from "../utils/tokens.js";

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = verifyAccessToken(token);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido o caducado." });
    }
}

export function requireRole(...roles) {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        const hasRole = roles.some((role) => userRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta." });
        }

        next();
    };
}
