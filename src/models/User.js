import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const allowedRoles = ["user", "admin"];

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "El nombre de usuario es obligatorio."],
            unique: true,
            trim: true,
            minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres."],
            maxlength: [40, "El nombre de usuario no puede superar 40 caracteres."]
        },
        password: {
            type: String,
            required: [true, "La contrasena es obligatoria."],
            minlength: [8, "La contrasena debe tener al menos 8 caracteres."],
            select: false
        },
        roles: {
            type: [String],
            enum: {
                values: allowedRoles,
                message: "El rol debe ser user o admin."
            },
            default: ["user"]
        }
    },
    { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
