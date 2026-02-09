import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre del festival es obligatorio."],
            minlength: [3, "El festival debe tener al menos 3 caracteres."],
            maxlength: [80, "El festival no puede superar 80 caracteres."]
        },
        type: {
            type: String,
            enum: {
                values: ["club", "open_air", "arena", "tour"],
                message: "El tipo debe ser: club, open_air, arena o tour."
            },
            default: "open_air"
        },
        city: {
            type: String,
            required: [true, "La ciudad es obligatoria."],
            minlength: [2, "La ciudad debe tener al menos 2 caracteres."],
            maxlength: [60, "La ciudad no puede superar 60 caracteres."]
        },
        capacity: {
            type: Number,
            required: [true, "La capacidad es obligatoria."],
            min: [50, "La capacidad mínima es 50."],
            max: [500000, "La capacidad máxima es 500000."]
        },
        isAnnual: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            required: [true, "La fecha de inicio es obligatoria."]
        }
    },
    { versionKey: false }
);

export const Festival = mongoose.model("Festival", festivalSchema);
