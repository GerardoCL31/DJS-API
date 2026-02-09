import dotenv from "dotenv";
import mongoose from "mongoose";

import { DJ } from "./models/DJ.js";
import { Festival } from "./models/Festival.js";
import { Booking } from "./models/Booking.js";

dotenv.config();

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB conectado para seed");


        await Booking.deleteMany();
        await DJ.deleteMany();
        await Festival.deleteMany();

        console.log(" Base de datos limpiada");


        const djs = await DJ.insertMany([
            {
                stageName: "Carl Cox",
                genre: "techno",
                country: "UK",
                yearsActive: 35,
                isLegend: true
            },
            {
                stageName: "Amelie Lens",
                genre: "techno",
                country: "Belgium",
                yearsActive: 10,
                isLegend: false
            },
            {
                stageName: "Martin Garrix",
                genre: "edm",
                country: "Netherlands",
                yearsActive: 12,
                isLegend: true
            }
        ]);

        console.log("DJs insertados");


        const festivals = await Festival.insertMany([
            {
                name: "Tomorrowland",
                type: "open_air",
                city: "Boom",
                capacity: 200000,
                isAnnual: true,
                startDate: "2026-07-17"
            },
            {
                name: "Ultra Music Festival",
                type: "open_air",
                city: "Miami",
                capacity: 165000,
                isAnnual: true,
                startDate: "2026-03-20"
            }
        ]);

        console.log(" Festivales insertados");


        await Booking.insertMany([
            {
                dj: djs[0]._id,
                festival: festivals[0]._id,
                setType: "closing",
                fee: 500000,
                isConfirmed: true,
                performanceDate: "2026-07-18"
            },
            {
                dj: djs[1]._id,
                festival: festivals[0]._id,
                setType: "main",
                fee: 180000,
                isConfirmed: true,
                performanceDate: "2026-07-18"
            },
            {
                dj: djs[2]._id,
                festival: festivals[1]._id,
                setType: "closing",
                fee: 750000,
                isConfirmed: false,
                performanceDate: "2026-03-21"
            }
        ]);

        console.log("Bookings insertados");

        console.log("SEED COMPLETADO");
        process.exit(0);

    } catch (error) {
        console.error("Error en seed:", error);
        process.exit(1);
    }
}

seedDB();
