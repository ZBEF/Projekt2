import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes from "./routes/reservationRoutes.js";

// Umgebungsvariablen laden
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware richtig platzieren
app.use(cors());
app.use(express.json());

// Routen einbinden
app.use("/api", reservationRoutes);

// Verbindung mit MongoDB herstellen
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("DB Fehler:", err));

// Server starten
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
