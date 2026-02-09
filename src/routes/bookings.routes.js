import { Router } from "express";
import { Booking } from "../models/Booking.js";

const router = Router();

const fullPopulate = { path: "dj festival" };

router.post("/", async (req, res, next) => {
    try {
        const created = await Booking.create(req.body);
        const full = await Booking.findById(created._id).populate(fullPopulate);
        res.status(201).json(full);
    } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
    try {
        res.json(await Booking.find().populate(fullPopulate));
    } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
    try {
        const item = await Booking.findById(req.params.id).populate(fullPopulate);
        if (!item) return res.status(404).json({ message: "Booking no encontrado." });
        res.json(item);
    } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate(fullPopulate);

        if (!updated) return res.status(404).json({ message: "Booking no encontrado." });
        res.json(updated);
    } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Booking no encontrado." });
        res.json({ message: "Booking eliminado." });
    } catch (e) { next(e); }
});

export default router;
