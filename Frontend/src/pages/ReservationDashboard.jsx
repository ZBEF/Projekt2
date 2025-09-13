import React, { useState, useEffect } from "react";
import {
  fetchReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../services/api";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString("de-DE");
};

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    table: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    try {
      const data = await fetchReservations();
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setReservations(sorted);
    } catch (e) {
      setErrorMsg(e.message || "Fehler beim Laden");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
    setErrorMsg("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      table: "",
    });
    setEditingId(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.guests) > 6) {
      setErrorMsg("Bitte mehr Tische reservieren – max. 6 Personen pro Tisch erlaubt.");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        table: formData.table.trim(),
        guests: Number(formData.guests),
      };

      const saved = editingId
        ? await updateReservation(editingId, payload)
        : await createReservation(payload);

      setReservations((prev) =>
        editingId ? prev.map((r) => (r._id === editingId ? saved : r)) : [...prev, saved]
      );
      resetForm();
    } catch (err) {
      setErrorMsg(err.message || "Fehler beim Speichern der Reservierung.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setErrorMsg(err.message || "Fehler beim Löschen.");
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      name: reservation.name || "",
      email: reservation.email || "",
      phone: reservation.phone || "",
      date: reservation.date || "",
      time: reservation.time || "",
      guests: reservation.guests ?? "",
      table: reservation.table || "",
    });
    setEditingId(reservation._id);
    setErrorMsg("");
  };

  return (
    <div className="container-fluid">
      <div className="card p-3">
        <h3 className="mb-3">Tischreservierungen</h3>

        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="E-Mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">-- Zeit auswählen --</option>
                {[
                  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
                  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                  "20:00", "20:30", "21:00"
                ].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                <option value="">-- Personenanzahl --</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Person" : "Personen"}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                name="table"
                value={formData.table}
                onChange={handleChange}
                required
              >
                <option value="">-- Tisch auswählen --</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={String(num)}>
                    Tisch {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Änderungen speichern" : "Reservierung erstellen"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={resetForm}
              >
                Abbrechen
              </button>
            )}
          </div>
        </form>

        <hr />

        <div className="table-responsive">
          <table className="table table-striped align-middle mt-3">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Telefon</th>
                <th>Datum</th>
                <th>Uhrzeit</th>
                <th>Personen</th>
                <th>Tisch</th>
                <th>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Keine Reservierungen gefunden
                  </td>
                </tr>
              ) : (
                reservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.phone}</td>
                    <td>{formatDate(r.date)}</td>
                    <td>{r.time}</td>
                    <td>{r.guests}</td>
                    <td>{r.table}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(r)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(r._id)}
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationDashboard;
