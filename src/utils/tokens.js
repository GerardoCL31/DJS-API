import jwt from "jsonwebtoken";

function getSecret(name) {
    const secret = process.env[name];
    if (!secret) {
        throw new Error(`Falta la variable de entorno ${name}.`);
    }
    return secret;
}

function tokenPayload(user) {
    return {
        sub: user._id.toString(),
        username: user.username,
        roles: user.roles
    };
}

export function createAccessToken(user) {
    return jwt.sign(tokenPayload(user), getSecret("JWT_SECRET"), {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m"
    });
}

export function createRefreshToken(user) {
    return jwt.sign(tokenPayload(user), getSecret("JWT_REFRESH_SECRET"), {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
    });
}

export function createTokenPair(user) {
    return {
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user)
    };
}

export function verifyAccessToken(token) {
    return jwt.verify(token, getSecret("JWT_SECRET"));
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, getSecret("JWT_REFRESH_SECRET"));
}
