export function errorHandler(err, req, res, next) {
    if (err?.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({ message: "Validación fallida", errors });
    }

    if (err?.name === "CastError") {
        return res.status(400).json({ message: `ID inválido en '${err.path}'.` });
    }

    if (err?.code === 11000) {
        return res.status(409).json({ message: "Ya existe un recurso con esos datos." });
    }

    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
}
