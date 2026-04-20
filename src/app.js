import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import djsRoutes from "./routes/djs.routes.js";
import festivalsRoutes from "./routes/festivals.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "DJs API OK" }));

app.use("/api/auth", authRoutes);
app.use("/api/djs", djsRoutes);
app.use("/api/festivals", festivalsRoutes);
app.use("/api/bookings", bookingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(` http://localhost:${PORT}`));
