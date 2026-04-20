import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { User } from "../../src/models/User.js";

const validUser = {
    username: "testuser",
    password: "password123",
    roles: ["user"]
};

test("User valido pasa la validacion", () => {
    const user = new User(validUser);
    const err = user.validateSync();

    assert.equal(err, undefined);
});

test("User requiere username", () => {
    const user = new User({ ...validUser, username: undefined });
    const err = user.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.username);
});

test("User requiere password de al menos 8 caracteres", () => {
    const user = new User({ ...validUser, password: "short" });
    const err = user.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.password);
});

test("User no acepta roles fuera del enum", () => {
    const user = new User({ ...validUser, roles: ["manager"] });
    const err = user.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors["roles.0"]);
});

test("User hashea la contrasena antes de guardar", async () => {
    const user = new User(validUser);

    await user.validate();
    await new Promise((resolve, reject) => {
        user.constructor.schema.s.hooks.execPre("save", user, [], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    assert.notEqual(user.password, validUser.password);
    assert.equal(await user.checkPassword(validUser.password), true);
});
