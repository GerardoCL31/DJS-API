import { Router } from "express";
import { DJ } from "../models/DJ.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try { res.status(201).json(await DJ.create(req.body)); }
    catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
    try { res.json(await DJ.find()); }
    catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
    try {
        const item = await DJ.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "DJ no encontrado." });
        res.json(item);
    } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updated = await DJ.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: "DJ no encontrado." });
        res.json(updated);
    } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await DJ.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "DJ no encontrado." });
        res.json({ message: "DJ eliminado." });
    } catch (e) { next(e); }
});

export default router;
