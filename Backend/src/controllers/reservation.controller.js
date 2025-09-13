import Reservation from "../models/reservation.model.js";

const VALID_TABLES = ["1", "2", "3", "4", "5", "6", "7", "8"];
const MAX_GUESTS_PER_TABLE = 6;

// Alle Reservierungen abrufen
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 }).lean();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen" });
  }
};

// Neue Reservierung erstellen
export const createReservation = async (req, res) => {
  try {
    const { date, time, table, guests } = req.body;

    if (!date || !time || !table || !guests) {
      return res.status(400).json({ message: "Alle Pflichtfelder müssen ausgefüllt werden." });
    }

    if (!VALID_TABLES.includes(table)) {
      return res.status(400).json({ message: "Ungültige Tisch-Nummer." });
    }

    if (typeof guests !== "number" || guests < 1 || guests > MAX_GUESTS_PER_TABLE) {
      return res.status(400).json({
        message: `Gästezahl muss zwischen 1 und ${MAX_GUESTS_PER_TABLE} liegen.`,
      });
    }

    const requestedTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (requestedTime < now) {
      return res.status(400).json({
        message: "Reservierungen in der Vergangenheit sind nicht erlaubt.",
      });
    }

    const existingReservations = await Reservation.find({ date, table }).lean();

    const conflict = existingReservations.find((r) => {
      const existingTime = new Date(`${r.date}T${r.time}`);
      const diffMinutes = Math.abs(existingTime - requestedTime) / (1000 * 60);
      return diffMinutes < 90;
    });

    if (conflict) {
      return res.status(409).json({
        message: "Reservierungen für denselben Tisch müssen mindestens 90 Minuten auseinanderliegen.",
      });
    }

    const saved = await Reservation.create(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen" });
  }
};

// Reservierung aktualisieren
export const updateReservation = async (req, res) => {
  try {
    const { date, time, table, guests } = req.body;

    if (!date || !time || !table || !guests) {
      return res.status(400).json({ message: "Alle Pflichtfelder müssen ausgefüllt werden." });
    }

    if (!VALID_TABLES.includes(table)) {
      return res.status(400).json({ message: "Ungültige Tisch-Nummer." });
    }

    if (typeof guests !== "number" || guests < 1 || guests > MAX_GUESTS_PER_TABLE) {
      return res.status(400).json({
        message: `Gästezahl muss zwischen 1 und ${MAX_GUESTS_PER_TABLE} liegen.`,
      });
    }

    const requestedTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (requestedTime < now) {
      return res.status(400).json({
        message: "Reservierungen in der Vergangenheit sind nicht erlaubt.",
      });
    }

    const existingReservations = await Reservation.find({
      _id: { $ne: req.params.id },
      date,
      table,
    }).lean();

    const conflict = existingReservations.find((r) => {
      const existingTime = new Date(`${r.date}T${r.time}`);
      const diffMinutes = Math.abs(existingTime - requestedTime) / (1000 * 60);
      return diffMinutes < 90;
    });

    if (conflict) {
      return res.status(409).json({
        message: "Reservierungen für denselben Tisch müssen mindestens 90 Minuten auseinanderliegen.",
      });
    }

    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Nicht gefunden" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Aktualisieren" });
  }
};

// Reservierung löschen
export const deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Nicht gefunden" });
    }
    res.json({ message: "Erfolgreich gelöscht" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim Löschen", error: error.message });
  }
};
