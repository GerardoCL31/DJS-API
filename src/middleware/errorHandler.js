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

    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
}
