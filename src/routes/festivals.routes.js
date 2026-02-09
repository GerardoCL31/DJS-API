import { Router } from "express";
import { Festival } from "../models/Festival.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try { res.status(201).json(await Festival.create(req.body)); }
    catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
    try { res.json(await Festival.find()); }
    catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
    try {
        const item = await Festival.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Festival no encontrado." });
        res.json(item);
    } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updated = await Festival.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: "Festival no encontrado." });
        res.json(updated);
    } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await Festival.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Festival no encontrado." });
        res.json({ message: "Festival eliminado." });
    } catch (e) { next(e); }
});

export default router;
