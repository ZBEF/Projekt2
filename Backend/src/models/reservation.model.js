import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  email:  { type: String, required: true, trim: true, lowercase: true },
  phone:  { type: String },
  date:   { type: String, required: true },   // "YYYY-MM-DD"
  time:   { type: String, required: true },   // "HH:mm"
  table:  { type: String, required: true },   // Tisch-Nummer / Name
  guests: { type: Number, required: true, min: 1 }
}, { timestamps: true });

// Index für schnelleres Suchen nach Datum + Tisch
reservationSchema.index({ date: 1, table: 1 });

export default mongoose.model('Reservation', reservationSchema);
