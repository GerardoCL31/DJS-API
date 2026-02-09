import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        dj: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DJ",
            required: [true, "El booking debe tener un DJ asociado."]
        },
        festival: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Festival",
            required: [true, "El booking debe tener un festival asociado."]
        },
        setType: {
            type: String,
            enum: {
                values: ["opening", "main", "closing"],
                message: "El setType debe ser: opening, main o closing."
            },
            default: "main"
        },
        fee: {
            type: Number,
            required: [true, "El caché (fee) es obligatorio."],
            min: [0, "El caché no puede ser negativo."],
            max: [2000000, "El caché no puede superar 2000000."]
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        performanceDate: {
            type: Date,
            required: [true, "La fecha de actuación es obligatoria."]
        }
    },
    { versionKey: false, timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
