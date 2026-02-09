import mongoose from "mongoose";

const djSchema = new mongoose.Schema(
    {
        stageName: {
            type: String,
            required: [true, "El nombre artístico es obligatorio."],
            minlength: [2, "El nombre artístico debe tener al menos 2 caracteres."],
            maxlength: [60, "El nombre artístico no puede superar 60 caracteres."]
        },
        genre: {
            type: String,
            enum: {
                values: ["house", "techno", "trance", "edm", "drum_and_bass", "hiphop", "other"],
                message:
                    "El género debe ser: house, techno, trance, edm, drum_and_bass, hiphop u other."
            },
            required: [true, "El género es obligatorio."]
        },
        country: {
            type: String,
            required: [true, "El país es obligatorio."],
            minlength: [2, "El país debe tener al menos 2 caracteres."],
            maxlength: [56, "El país no puede superar 56 caracteres."]
        },
        yearsActive: {
            type: Number,
            required: [true, "Los años activo/a son obligatorios."],
            min: [0, "Los años activo/a no pueden ser negativos."],
            max: [80, "Los años activo/a no pueden superar 80."]
        },
        isLegend: {
            type: Boolean,
            default: false
        },
        debutDate: {
            type: Date,
            default: Date.now
        }
    },
    { versionKey: false, timestamps: true }
);

export const DJ = mongoose.model("DJ", djSchema);
