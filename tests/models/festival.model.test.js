import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { Festival } from "../../src/models/Festival.js";

const validFestival = {
    name: "Dreambeach",
    type: "open_air",
    city: "Almeria",
    capacity: 45000,
    isAnnual: true,
    startDate: new Date("2026-08-10")
};

test("Festival valido pasa la validacion", () => {
    const festival = new Festival(validFestival);
    const err = festival.validateSync();

    assert.equal(err, undefined);
});

test("Festival requiere name", () => {
    const festival = new Festival({ ...validFestival, name: undefined });
    const err = festival.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.name);
});

test("Festival requiere city", () => {
    const festival = new Festival({ ...validFestival, city: undefined });
    const err = festival.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.city);
});

test("Festival no acepta type fuera del enum", () => {
    const festival = new Festival({ ...validFestival, type: "warehouse" });
    const err = festival.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.type);
});

test("Festival capacity no puede ser menor de 50", () => {
    const festival = new Festival({ ...validFestival, capacity: 49 });
    const err = festival.validateSync();

    assert.ok(err instanceof mongoose.Error.ValidationError);
    assert.ok(err.errors.capacity);
});
