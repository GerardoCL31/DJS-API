import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { DJ } from "../../src/models/DJ.js";

const validDJ = {
    stageName: "Carl Cox",
    genre: "techno",
    country: "UK",
    yearsActive: 35,
    isLegend: true
};

test("DJ valido pasa la validacion", () => {
    const dj = new DJ(validDJ);
    const err = dj.validateSync();

    assert.equal(err, undefined);
});

test("DJ requiere stageName", () => {
    const dj = new DJ({ ...validDJ, stageName: undefined });
    const err = dj.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.stageName);
});

test("DJ no acepta genre fuera del enum", () => {
    const dj = new DJ({ ...validDJ, genre: "reggaeton" });
    const err = dj.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.genre);
});

test("DJ yearsActive no puede ser negativo", () => {
    const dj = new DJ({ ...validDJ, yearsActive: -1 });
    const err = dj.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.yearsActive);
});

test("DJ yearsActive no puede superar 80", () => {
    const dj = new DJ({ ...validDJ, yearsActive: 81 });
    const err = dj.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.yearsActive);
});
