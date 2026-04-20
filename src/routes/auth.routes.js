import { Router } from "express";

import { User } from "../models/User.js";
import { createAccessToken, createTokenPair, verifyRefreshToken } from "../utils/tokens.js";

const router = Router();

function publicUser(user) {
    return {
        id: user._id,
        username: user.username,
        roles: user.roles
    };
}

router.post("/register", async (req, res, next) => {
    try {
        const { username, password, roles } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "El usuario ya existe." });
        }

        const user = await User.create({ username, password, roles });

        res.status(201).json({
            user: publicUser(user),
            ...createTokenPair(user)
        });
    } catch (e) {
        next(e);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).json({ message: "Credenciales invalidas." });
        }

        res.json({
            user: publicUser(user),
            ...createTokenPair(user)
        });
    } catch (e) {
        next(e);
    }
});

router.post("/refresh", async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "El refreshToken es obligatorio." });
        }

        const payload = verifyRefreshToken(refreshToken);
        const user = await User.findById(payload.sub);

        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }

        res.json({ accessToken: createAccessToken(user) });
    } catch (e) {
        return res.status(401).json({ message: "Refresh token invalido o caducado." });
    }
});

export default router;
